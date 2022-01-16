import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

import configDefault from '../config/config.default';
import errType from '../constant/err.type';

const { 
  tokenExpiredError, 
  invalidToken,
  isNotAdmin,
} = errType;
const { JWT_SECRET } = configDefault;

/** 验证是否携带token */
export const auth = async(ctx: Context, next: Next) => {
  const { authorization } = ctx.request.header;
  const token = authorization?.replace('Bearer ', '');
  // console.debug(token);

  try {

    // if (token) {
    //   // user中包含了payload的信息（id， user_name，is_admin）
    //   const user = jwt.verify(token, JWT_SECRET as string);
    //   ctx.state.user = user;

    //   await next();
    // }

    const user = jwt.verify(token as string, JWT_SECRET as string);
    ctx.state.user = user;

    await next();

  } catch (e:any) {
    switch(e.name) {
      case 'TokenExpiredError':
        console.error('token已过期', e);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('无效的token', e);
        return ctx.app.emit('error', invalidToken, ctx);
    }
  }
};

/** 是否拥有管理员权限 */
export const isAdmin = async (ctx: Context, next: Next) => {
  const { is_admin } = ctx.state.user;

  if (!is_admin) {
    console.error('该用户没有管理员的权限', ctx.state.user);
    return ctx.app.emit('error', isNotAdmin, ctx);
  }

  await next();
  
}
