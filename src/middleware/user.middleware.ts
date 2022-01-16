import { Context, Next } from 'koa';
import bcrypt from 'bcryptjs';

import userService from '../service/user.service';
import errType from '../constant/err.type';

const { 
  userFormateError,
  userAlreadyExited,
  userResigterEror,
  userDoesNotExist,
  userLoginError,
  userPasswordInvaild,
} = errType;
const { getUserInfo } = userService;

/** 验证账号或密码是否为空 */
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

/** 验证用户是否存在 */
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
      ctx.app.emit('error', userResigterEror, ctx);
      return;
    }
    await next();
};

/** 密码加密 */
export const encryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  // hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  
  ctx.request.body.password = hash;

  await next();
};

/** 验证登录账号和密码 */
export const verifyLogin = async(ctx: Context, next: Next) => {
  // 1. 判断用户是否存在（不存在就报错）
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });

    if (!res) {
      console.error('用户名不存在', { user_name });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }

    // 2. 判断密码是否匹配（不匹配就报错）
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', userPasswordInvaild, ctx);
      return;
    }
  } catch (e) {
    console.error(e);
    ctx.app.emit('error', userLoginError, ctx);
  }
  

  await next();
};