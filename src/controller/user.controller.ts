import {Context, Next} from 'koa';

class UserController {
  async register(ctx: Context, next: Next) {
    ctx.body = '用户注册成功';
  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;
