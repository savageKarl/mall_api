import path from 'path';

import {Context, Next} from 'koa';

import errType from '../constant/err.type';
import goodsService from '../service/goods.service';

const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = goodsService;

const { 
  fileUploadError,
  unSupportFileType,
  publishGoodsError,
  invalidGoodsId,
} = errType;

class GoodsController {
  // 上传商品图片
  async upload(ctx: Context, next: Next) {

    // 这里有个细节没有处理，无法这里是否返回，文件都会被上传的，需要去配置koa-static
    const { file } = ctx.request.files as any;

    const fileType = ['image/jpeg', 'image/png'];

    if (file) {
      if (!fileType.includes(file.type)) {
        return ctx.app.emit('error', unSupportFileType, ctx);
      }

      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path),
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  // 创建商品
  async create(ctx: Context) {
    // 直接调用service的createGoods方法
    try {
      const { createdAt, updatedAt, ...res} = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (e) {
      console.error(e);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }

  // 更新商品信息
  async update(ctx: Context) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);

      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 下架商品
  async remove(ctx: Context) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: '',
        };
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 上架商品
  async restore(ctx: Context) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: '',
        };  
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 获取商品列表
  async findAll(ctx: Context) {
    const { pageNum, pageSize } = ctx.request.query;
    try {
      const res = await findGoods(Number(pageNum) || 1, Number(pageSize) || 10);
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取商品列表成功',
          result: res,
        };
      } else {

      }
    } catch (e) {
      console.error(e);
    }

  }
}

export default new GoodsController;
