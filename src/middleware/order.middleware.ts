import { Context, Next } from 'koa';

import errType from '../constant/err.type';

const { 
  orderFormatError,
} = errType;


export const validtor = (rules: unknown) => {
  return async (ctx: Context, next: Next) => {
    try {
      ctx.verifyParams(rules);
    } catch (e: any) {
      console.error(e)
      orderFormatError.result = e;
      return ctx.app.emit('error', orderFormatError, ctx);
    }
    await next();
  }
}