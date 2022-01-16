import {Context, Next} from 'koa';

import errType from '../constant/err.type';

import cartService from '../service/cart.service';

const {
  cartFormatError,
} = errType;

const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
  unselectAllCarts,
} = cartService;

class CartController {
  // 将商品添加到购物车
  async add(ctx: Context) {
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        message: '添加到购物车成功',
        result: res,
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 获取购物车列表
  async findAll(ctx: Context) {
    try {
      const { pageNum, pageSize } = ctx.request.query;
      const res = await findCarts(Number(pageNum) || 1, Number(pageSize) || 10);
      ctx.body = {
        code: 0,
        message: '获取购物车列表成功',
        result: res,
      };
    } catch (e) {
      console.error(e);
    }
  }

  // 更新购物车
  async update(ctx: Context) {
    const { id } = ctx.params;
    const { number, selected } = ctx.request.body;

    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number和selected不能同时为空';
      return ctx.app.emit('error', cartFormatError, ctx);
    }

    try {
      const res = await updateCarts({ id, number, selected });
      if (res) {
        ctx.body = {
          code: 0,
          message: '更新购物车成功',
          result: res,
        };
      } else {

      }
    } catch (e) {
      console.error(e);
    }
  }

  // 移除购物车
  async remove(ctx: Context) {
    const { ids } = ctx.request.body;
    const res = await removeCarts(ids);
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除购物车成功',
        result: res,
      };
    } else {
      cartFormatError.message = '购物车id不存在';
      return ctx.app.emit('error', cartFormatError, ctx);
    }
  }

  // 全选购物车
  async selectAll(ctx: Context) {
    const user_id = ctx.state.user.id;
     try {
        const res = await selectAllCarts(user_id);
        if (res) {
          ctx.body = {
            code: 0,
            message: '全部选中',
            result: res,
          }
        }
     } catch (e) {  
       console.error(e);
     }
  }

  
  // 全选购物车
  async unselectAll(ctx: Context) {
    const user_id = ctx.state.user.id;
     try {
        const res = await unselectAllCarts(user_id);
        if (res) {
          ctx.body = {
            code: 0,
            message: '全部不选中',
            result: res,
          }
        }
     } catch (e) {  
       console.error(e);
     }
  }
}

export default new CartController();
