import fs from 'fs';

import Router from '@koa/router';

const router = new Router();

// 自动注册每个路由模块，不用每次手动去app注册
fs.readdirSync(__dirname).forEach(file => {

  if (file !== 'index.ts') {
    import('./' + file).then(res => {
      router.use(res.default.routes());
    }).catch(e => {
      console.error(e);
    })
  }
});

export default router;

