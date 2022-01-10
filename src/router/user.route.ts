import Router from '@koa/router';
import userController from '../controller/user.controller';

const { register, login } = userController;

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', register);

// 登录接口
router.post('/login', login);
export default router;
