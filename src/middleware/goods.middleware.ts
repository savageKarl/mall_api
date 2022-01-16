import { Context, Next } from 'koa';

import errType from '../constant/err.type';

const { 
  goodsFormatError
} = errType;

/** 验证商品参数 */
export const validator = async (ctx: Context, next: Next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    });
  } catch (e: any) {
    console.error(e);
    goodsFormatError.result = e;
    return ctx.app.emit('error', goodsFormatError, ctx);
  }

  await next();
}

