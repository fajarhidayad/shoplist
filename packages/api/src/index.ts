import { Hono } from 'hono';

const PORT = 3000;
const app = new Hono();

app.get('/', (c) => {
  return c.json({
    message: 'Worked',
  });
});

export default {
  fetch: app.fetch,
  port: PORT,
};
