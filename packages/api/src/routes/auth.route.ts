import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Context } from '../lib/context';
import { lucia } from '../lib/auth';
import { prisma } from '../db/prisma';
import { HTTPException } from 'hono/http-exception';

const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password minimum 6 characters' }),
});

const loginSchema = registerSchema.omit({ firstName: true, lastName: true });

export const authRouter = new Hono<Context>()
  .post(
    '/register',
    zValidator('json', registerSchema, (result, c) => {
      if (!result.success) {
        c.status(400);
        return c.json({
          message: 'Invalid form request',
          error: result.error.flatten().fieldErrors,
        });
      }
    }),
    async (c) => {
      const formData = c.req.valid('json');

      const user = await prisma.user.findUnique({
        where: {
          email: formData.email,
        },
      });

      if (user) {
        c.status(400);
        return c.json({
          message: 'Email already exist',
        });
      }

      const hash = await Bun.password.hash(formData.password, {
        algorithm: 'argon2d',
      });

      const newUser = await prisma.user.create({
        data: {
          ...formData,
          password: hash,
        },
      });

      const session = await lucia.createSession(newUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      c.header('Set-Cookie', sessionCookie.serialize());

      return c.json({
        message: 'success',
      });
    }
  )
  .post(
    '/login',
    zValidator('json', loginSchema, (result, c) => {
      if (!result.success) {
        c.status(400);
        return c.json({
          message: 'Invalid form request',
          error: result.error.flatten().fieldErrors,
        });
      }
    }),
    async (c) => {
      const formData = c.req.valid('json');

      const user = await prisma.user.findUnique({
        where: {
          email: formData.email,
        },
      });

      if (!user) {
        c.status(400);
        return c.json({
          message: 'Invalid email or password.',
        });
      }

      const password = await Bun.password.verify(
        formData.password,
        user.password
      );

      if (!password) {
        c.status(400);
        return c.json({
          message: 'Invalid email or password.',
        });
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      c.header('Set-Cookie', sessionCookie.serialize(), { append: true });

      return c.json({
        message: 'success',
      });
    }
  )
  .post('/logout', async (c) => {
    const user = c.get('user');
    if (!user) {
      c.status(401);
      return c.json({
        message: 'unauthorized',
      });
    }
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize());
    return c.json({
      message: 'success',
    });
  })
  .get(
    '/profile',
    (c, next) => {
      const session = c.get('session');
      if (!session) {
        throw new HTTPException(401, {
          message: 'unauthorized',
        });
      }
      return next();
    },
    async (c) => {
      const user = c.get('user');

      const profile = await prisma.user.findUnique({
        where: {
          email: user?.email,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      return c.json({
        data: profile,
      });
    }
  );
