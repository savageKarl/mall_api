import Koa from 'koa';

import config from './config/config.default';

const { APP_PORT } = config;

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello, api2';
});

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
