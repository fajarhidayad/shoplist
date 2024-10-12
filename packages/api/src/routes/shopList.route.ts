import { Hono } from 'hono';
import type { Context } from '../lib/context';
import { prisma } from '../db/prisma';

export const shopListRoutes = new Hono<Context>()
  .get('/', async (c) => {
    const user = c.get('user')!;
    const shoppingList = await prisma.shopList.findMany({
      where: {
        userId: user.id,
      },
    });
    return c.json({
      data: shoppingList,
    });
  })
  .post('/', async (c) => {
    return c.json({});
  })
  .put('/:id{[0-9]+$}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    return c.json({});
  })
  .delete('/:id{[0-9]+$}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    return c.json({});
  });
