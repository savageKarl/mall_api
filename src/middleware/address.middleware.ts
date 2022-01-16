import { Context, Next } from 'koa';

import errType from '../constant/err.type';

const { 
  addressFormatError,
} = errType;

export const validtor = (rules: unknown) => {
  return async (ctx: Context, next: Next) => {
    try {
      await ctx.verifyParams(rules);
    } catch (e: any) {
      console.error(e);
      addressFormatError.result = e;
      return ctx.app.emit('error', addressFormatError, ctx);
    }

    await next();
  }
}