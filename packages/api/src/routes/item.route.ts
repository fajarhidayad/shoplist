import { Hono } from 'hono';
import type { Context } from '../lib/context';
import { prisma } from '../db/prisma';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';

const schema = z.object({
  name: z.string().min(3),
  note: z.string().nullish(),
  image: z.string().nullish(),
  category: z.string().min(3),
});

export const itemRoutes = new Hono<Context>()
  .get('/', async (c) => {
    const userId = c.get('user')!.id;
    const items = await prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });

    return c.json({
      data: items,
    });
  })
  .post('/', zValidator('json', schema), async (c) => {
    const formData = c.req.valid('json');
    const user = c.get('user');

    const category = await prisma.category.findFirst({
      where: {
        userId: user?.id,
        name: formData.category,
      },
    });

    if (!category) {
      const newCategory = await prisma.category.create({
        data: {
          name: formData.category,
          userId: user?.id!,
        },
      });

      const newItem = await prisma.item.create({
        data: {
          name: formData.name,
          note: formData.note,
          imageUrl: formData.image,
          categoryId: newCategory.id,
          userId: user?.id!,
        },
      });

      return c.json(
        {
          data: newItem,
        },
        {
          status: 201,
        }
      );
    }

    const newItem = await prisma.item.create({
      data: {
        name: formData.name,
        note: formData.note,
        imageUrl: formData.image,
        userId: user?.id!,
        categoryId: category.id,
      },
    });

    return c.json(
      {
        data: newItem,
      },
      {
        status: 201,
      }
    );
  })
  .put('/:id{[0-9]+$}', zValidator('json', schema), async (c) => {
    const formData = c.req.valid('json');
    const user = c.get('user');
    const id = Number.parseInt(c.req.param('id'));

    const category = await prisma.category.findFirst({
      where: {
        userId: user?.id,
        name: formData.category,
      },
    });

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new HTTPException(404, { message: 'Item not found' });
    }

    if (!category) {
      const newCategory = await prisma.category.create({
        data: {
          name: formData.category,
          userId: user?.id!,
        },
      });

      const updatedItem = await prisma.item.update({
        data: {
          name: formData.name,
          note: formData.note,
          imageUrl: formData.image,
          categoryId: newCategory.id,
          userId: user?.id!,
        },
        where: {
          id,
        },
      });

      return c.json(
        {
          data: updatedItem,
        },
        {
          status: 200,
        }
      );
    }

    const updatedItem = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name: formData.name,
        note: formData.note,
        imageUrl: formData.image,
        categoryId: category.id,
        userId: user?.id!,
      },
    });

    return c.json(
      {
        data: updatedItem,
      },
      {
        status: 200,
      }
    );
  })
  .delete('/:id{[0-9]+$}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new HTTPException(404, {
        message: 'Item not found',
      });
    }

    await prisma.item.delete({
      where: {
        id,
      },
    });

    return c.json({
      message: 'success',
    });
  })
  .get('/:id{[0-9]+$}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!item) {
      throw new HTTPException(404, {
        message: 'Item not found',
      });
    }

    return c.json({
      data: item,
    });
  });
