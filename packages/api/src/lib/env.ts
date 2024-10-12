import { ZodError, z } from 'zod';

const stringBoolean = z.coerce.string().transform((val) => {
  return val === 'true';
});

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  DOMAIN: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env files:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const err = new Error(message);
    err.stack = '';
    throw err;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
