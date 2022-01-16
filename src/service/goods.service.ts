import Goods from "../model/goods.model";


interface GoodsInfo {
  goods_name: string;
  goods_price: number;
  goods_num: number;
  goods_img: string;
}


class GoodsService {
  // 创建商品
  async createGoods(goods: GoodsInfo) {
    const res = await Goods.create(goods);
    return (res as any).dataValues;
  }

  // 更新商品
  async updateGoods(id: number, goods: GoodsInfo) {
    const res = await Goods.update(goods, { where: { id } });

    return res[0] > 0 ? true : false;
  } 

  // 下架商品
  async removeGoods(id: number) {
    const res = await Goods.destroy({ where: { id } });
    console.log(res)
    return res > 0 ? true : false; 
  }

  // 上架商品
  async restoreGoods(id: number) {
    const res = await Goods.restore({ where: { id } });
    return res as unknown as number;
  }

  // 获取商品列表
  async findGoods(pageNum: number, pageSize: number) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: Number(pageSize),
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
}

export default new GoodsService();
