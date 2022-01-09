import Koa from 'koa';

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello, api';
});

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});