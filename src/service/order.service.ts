import Order from '../model/order.model';

interface OrderInfo {
  user_id: number;
  address_id: number;
  goods_info: string;
  total: number;
  order_number: string;
}

class OrderService {
  // 创建订单
  async createOrder(order: OrderInfo) {
    return await Order.create(order);
  }

  // 获取订单列表
  async findAllOrder(pgaeNum: number, pageSize: number, status: number) {
    const {count, rows } = await Order.findAndCountAll({
      attributes: ['id', 'user_id', 'address_id', 'goods_info', 'total', 'order_number', 'status'],
      where: {
        status,
      },
      offset: (pgaeNum -1) * pageSize,
      limit: pageSize* 1,
    });

    return {
      pgaeNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  // 更新订单状态
  async updateOrder(id: number, status: number) {
    return await Order.update( { status }, { where: { id } });
  }
}

export default new OrderService();
