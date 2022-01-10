import {Context, Next} from 'koa';

import userService from '../service/user.service';

const { createUser } = userService;
class UserController {
  async register(ctx: Context, next: Next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const {user_name, password} = ctx.request.body;
    // 2. 操作数据库
    const res = await createUser(user_name, password);
    console.log(res);
    // 3. 返回结果
    ctx.body = ctx.request.body;
  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;
