import Router from '@koa/router';
import userController from '../controller/user.controller';
import {
  userValidator,
  verifyUser,
  encryptPassword,
  verifyLogin,
} from '../middleware/user.middleware';

import {
  auth
} from '../middleware/auth.middleware';

const { register, login, changePassword } = userController;

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', userValidator, verifyUser, encryptPassword, register);

// 登录接口
router.post('/login', userValidator, verifyLogin, login);

// 修改密码
router.patch('/', auth, encryptPassword, changePassword, (ctx, next) => {
  console.log(ctx.state.user);

  ctx.body = '修改密码成功'
})
export default router;
