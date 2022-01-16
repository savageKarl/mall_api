import { Op } from 'sequelize';

import Goods from '../model/goods.model';
import Cart from "../model/cart.model";

class CartService {
  // 创建或者更新购物车
  async createOrUpdate(user_id: number, goods_id: number) {

    // 这里有个细节没有去处理，没有去判断商品id是否存在
    const res = await Cart.findOne({
      where: {
        [Op.and] : {
          user_id,
          goods_id,
        },
      },
    });

    if (res) {
      // 已经存在一条记录，将number + 1
      res.increment('number');
      return await res.reload();
    } else {
      return await Cart.create({ user_id, goods_id });
    }
  }

  // 获取购物车列表
  async findCarts(pageNum: number, pageSize: number) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
      },
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  // 更新购物车
  async updateCarts(params: { id: number, number?: number, selected?: boolean }) {
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);
    console.log(id, res)

    if (!res) return res;

    number !== undefined ? ((res as any).number = number) : '';
    
    if (selected !== undefined) (res as any).selected = selected;

    return await res.save();
  }

  // 删除购物车
  async removeCarts(ids: string[]) {
    const res = await Cart.destroy({
      where: {
        id: {
          [Op.in] : ids,
        },
      },
    });
    console.log(res);

    return res;
  };

  // 全选购物车
  async selectAllCarts(user_id: number) {
    const res = await Cart.update({ selected: true }, {
      where: {
        user_id
      }
    });
    return res[0];
  }

  async unselectAllCarts(user_id: number) {
     const res = await Cart.update({ selected: false }, {
      where: {
        user_id
      }
    });
    return res[0];
  }
}

export default new CartService();
