import Router from "@koa/router";

import cartController from "../controller/cart.controller";

const {
  add,
  findAll,
  update,
  remove,
  selectAll,
  unselectAll
} = cartController;

import {
  auth,
  isAdmin,
} from '../middleware/auth.middleware';

import {
  validator
} from '../middleware/cart.middleware';

const router = new Router({ prefix: '/carts' });

// 添加到购物车接口
router.post('/', auth, validator({ goods_id: 'number' }), add);

// 获取购物车列表接口
router.get('/', auth, findAll)

// 更新购物车
router.patch('/:id', auth, validator({
  number: { type: 'number', required: false },
  selected: { type: 'bool', required: false },
}), update)

// 删除购物车
router.delete('/', auth, validator({ ids: 'array' }), remove);

// 全选购物车
router.post('/selectAll', auth, selectAll);

// 全部不选中购物车
router.post('/unselectAll', auth, unselectAll);

export default router;
