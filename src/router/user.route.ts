import Router from '@koa/router';
import userController from '../controller/user.controller';
import { userValidator, verifyUser } from '../middleware/user.middleware';
const { register, login } = userController;

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', userValidator, verifyUser, register);

// 登录接口
router.post('/login', login);
export default router;
