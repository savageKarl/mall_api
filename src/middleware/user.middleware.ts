import { Context, Next } from 'koa';
import userService from '../service/user.service';
import errType from '../constant/err.type';

const { userFormateError, userAlreadyExited, userResigterEror } = errType;
const { getUserInfo } = userService;

export const userValidator = async (ctx: Context, next: Next) => {
  // 合法性
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }

  await next();
};

export const verifyUser = async (ctx: Context, next: Next) => {
    // 合理性
    const { user_name } = ctx.request.body;
    try {
      const res = await getUserInfo({ user_name });
      if (res) {
        console.error('用户名已经存在');
        ctx.app.emit('error', userAlreadyExited, ctx);
        return;
      }
    } catch (e) {
      console.error('用户注册错误');
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }

    await next();
};

