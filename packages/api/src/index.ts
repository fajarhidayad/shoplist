import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { lucia } from './lib/auth';
import env from './lib/env';
import { authRouter } from './routes/auth.route';
import type { Context } from './lib/context';
import { categoryRouter } from './routes/category.route';
import { HTTPException } from 'hono/http-exception';

const PORT = env.PORT;
const app = new Hono<Context>();

app
  .use(logger())
  .use(
    csrf({
      origin: env.DOMAIN,
    })
  )
  .use(
    '*',
    cors({
      origin: env.DOMAIN,
      credentials: true,
    })
  )
  .use('*', async (c, next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
    if (!sessionId) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      c.header('Set-Cookie', lucia.createSessionCookie(sessionId).serialize(), {
        append: true,
      });
    }

    if (!session) {
      c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
        append: true,
      });
    }

    c.set('user', user);
    c.set('session', session);
    return next();
  })
  .get('/health', (c) => c.json({ status: '100% Works' }));

const api = app
  .basePath('/api')
  .route('/auth', authRouter)
  .use('/*', (c, next) => {
    const user = c.get('user');
    if (!user) {
      throw new HTTPException(401, {
        message: 'unauthorized',
      });
    }
    return next();
  })
  .route('/categories', categoryRouter)
  .onError((err, c) => {
    if (c.res.status >= 500) {
      return c.json({
        message: 'Internal server error',
        stack: err.stack,
      });
    }

    return c.json({
      message: err.message,
    });
  })
  .notFound((c) => {
    c.status(404);
    return c.json({
      message: 'not found',
    });
  });

export default {
  fetch: app.fetch,
  port: PORT,
};

export type APIRoutes = typeof api;
