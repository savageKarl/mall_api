import Router from "@koa/router";

import {
  auth,
} from '../middleware/auth.middleware';

import {
  validtor
} from '../middleware/address.middleware';

import addressController from '../controller/address.controller';

const {
  create,
  findAll,
  update,
  remove,
  setDefault
} = addressController;

const router = new Router({ prefix: '/address' });


// 添加收货地址
router.post('/' ,auth, validtor({
  consignee: 'string',
  phone: { type: 'string', format: /^\d{11}$/ },
  address: 'string',
}), create);

// 获取地址列表
router.get('/', auth, findAll);

// 修改地址
router.put('/:id', auth, update);

// 删除地址
router.delete('/:id', auth, remove);

// 设为默认地址
router.patch('/:id', auth, setDefault);

export default router;
