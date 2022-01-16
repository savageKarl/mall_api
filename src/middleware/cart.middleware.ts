import { Context, Next } from 'koa';

import errType from '../constant/err.type';

const { 
  cartFormatError,
} = errType;

export const validator = (rules: unknown) => {
  return async (ctx: Context, next: Next) => {
    try {
      ctx.verifyParams(rules);
    } catch (e: any) {
      console.error(e);
      cartFormatError.result = e;
      return ctx.app.emit('error', cartFormatError, ctx);
    };
  
    await next();
  }
  
}