import Router from "@koa/router";

import goodsController from "../controller/goods.controller";
import {
  auth,
  isAdmin
} from '../middleware/auth.middleware';

import {
  validator
} from '../middleware/goods.middleware'

const router = new Router({ prefix: '/goods' });

const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll
} = goodsController;

// 商品图片上传接口
router.post('/upload', auth, isAdmin, upload);

// 发布商品接口
router.post('/', auth, isAdmin, validator, create);

// 修改商品接口
router.put('/:id', auth, isAdmin, validator, update);

// 硬删除接口
// router.delete('/:id', auth, isAdmin, remove);

// 商品下架
router.post('/:id/off', auth, isAdmin, remove);

// 商品上架
router.post('/:id/on', auth, isAdmin, restore)

// 获取商品列表
router.get('/', findAll)

export default router;
