import Router from "@koa/router";

import {
  auth,
} from '../middleware/auth.middleware';

import {
  validtor
} from '../middleware/order.middleware';

import orderController from "../controller/order.controller";

const {
  create,
  findAll,
  update,
} = orderController;


const router = new Router({ prefix: '/orders' });

// 创建订单
router.post('/', auth, validtor({
  address_id: 'int',
  goods_info: 'string',
  total: 'string',
}), create);

// 获取订单列表
router.get('/', auth, findAll);

// 更新订单状态
router.patch('/:id', auth, validtor({
  status: 'number',
}), update);

export default router;
