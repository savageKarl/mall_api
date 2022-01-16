import path from 'path';

import Koa from 'koa';
import koaBody from 'koa-body';
import Koastatic from 'koa-static';

import parameter from 'koa-parameter';

// import userRouter from '../router/user.route';
// import goodsRouter from '../router/goods.route';
import errorHandler from './errorHandler';

import router from '../router';

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    // 在配置选项options里，不推荐使用相对路径
    // 在options里的相对路径，不是相对的当前文件。相对proces.cwd
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true,
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use(Koastatic(path.join(__dirname, '../upload')));
app.use(parameter(app));

// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on('error', errorHandler);

export default app;
