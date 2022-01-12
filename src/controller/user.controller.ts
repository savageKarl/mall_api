import {Context, Next} from 'koa';

import userService from '../service/user.service';
import errType from '../constant/err.type';

const { createUser, getUserInfo } = userService;
const { userResigterEror } = errType;
class UserController {
  async register(ctx: Context, next: Next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const {user_name, password} = ctx.request.body;

    try {
      // 2. 操作数据库
      const res = await createUser(user_name, password);
      console.log(res);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (e) {
      console.log(e);
      ctx.app.emit('eror', userResigterEror, ctx);
    }

  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;
