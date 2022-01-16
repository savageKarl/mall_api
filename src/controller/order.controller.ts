import {Context, Next} from 'koa';

import orderService from '../service/order.service';

const {
  createOrder,
  findAllOrder,
  updateOrder,
} = orderService;

class OrderController {
  async create(ctx: Context) {
    const user_id = ctx.state.user.id;
    const { address_id, goods_info, total } = ctx.request.body;

    const order_number = 'ZD' + Date.now();

    try {
      const res = await createOrder({
        user_id,
        address_id,
        goods_info,
        total,
        order_number,
      });

      if (res) {
        ctx.body = {
          code: 0,
          message: '生成订单成功',
          result: res,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 获取订单列表
  async findAll(ctx: Context) {
    const { pageNum, pageSize, status } = ctx.request.query;
    try {
      const res = await findAllOrder(
        Number(pageNum) || 1, 
        Number(pageSize || 10),
        Number(status) || 0);
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取订单列表成成功',
          result: res,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 修改订单状态
  async update(ctx: Context) {
    const id = ctx.params.id;
    const { status } = ctx.request.body;

    try {
      const res = await updateOrder(id, status);
      if (res) {
        ctx.body = {
          code: 0,
          message: '更新订单状态',
          result: res,
        };
      }
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new OrderController();
