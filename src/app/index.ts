import Koa from 'koa';

import userRouter from '../router/user.route';

const app = new Koa();

app.use(userRouter.routes());

export default app;
