import { Lucia, TimeSpan } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from '../db/prisma';
import env from './env';

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  interface DatabaseUserAttributes {
    email: string;
  }
}

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'session',
    expires: true,
    attributes: {
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // domain: env.DOMAIN,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
  sessionExpiresIn: new TimeSpan(7, 'd'),
});
