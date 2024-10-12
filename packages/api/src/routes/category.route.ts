import { Hono } from 'hono';
import type { Context } from '../lib/context';
import { prisma } from '../db/prisma';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';

const schema = z.object({
  name: z.string().min(3),
});

export const categoryRoutes = new Hono<Context>()
  .get('/', async (c) => {
    const session = c.get('session');

    const categories = await prisma.category.findMany({
      where: {
        userId: session?.userId,
      },
    });

    return c.json({
      data: categories,
    });
  })
  .post('/', zValidator('json', schema), async (c) => {
    const formData = c.req.valid('json');
    const session = c.get('session');

    const category = await prisma.category.findFirst({
      where: {
        userId: session?.userId,
        name: formData.name,
      },
    });

    if (category) {
      c.status(400);
      throw new HTTPException(400, {
        message: 'category already exist',
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: formData.name,
        userId: session!.userId,
      },
    });

    return c.json(
      {
        message: 'success',
        data: newCategory,
      },
      201
    );
  })
  .put('/:id{[0-9]+$}', zValidator('json', schema), async (c) => {
    const formData = c.req.valid('json');
    const session = c.get('session');
    const id = Number.parseInt(c.req.param('id'));

    const category = await prisma.category.findFirst({
      where: {
        name: formData.name,
        userId: session!.userId,
      },
    });

    if (category) {
      c.status(400);
      throw new HTTPException(400, {
        message: 'category already exist',
      });
    }

    const old = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!old) {
      c.status(404);
      throw new HTTPException(404, {
        message: 'record not found',
      });
    }

    const update = await prisma.category.update({
      data: {
        name: formData.name,
      },
      where: {
        id,
      },
    });

    return c.json({
      message: 'success',
      data: update,
    });
  })
  .delete('/:id{[0-9]+$}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      c.status(404);
      throw new HTTPException(404, {
        message: 'record not found',
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return c.json({
      message: 'success',
    });
  });
