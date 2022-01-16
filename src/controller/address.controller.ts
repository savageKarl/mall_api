import {Context, Next} from 'koa';

import addressService from '../service/address.service';

const {
  createAddress,
  findAllAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} = addressService;

class AddressController {
  // 创建地址
  async create(ctx: Context) {
    const user_id = ctx.state.user.id;
    const { consignee, phone, address } = ctx.request.body;

    try {
      const res = await createAddress({ user_id, consignee, phone, address });
      if (res) {
        ctx.body = {
          code: 0,
          message: '添加地址成功',
          result: res,
        };
      } else {
        
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 获取地址列表
  async findAll(ctx: Context) {
    const user_id = ctx.state.user.id;
  
    try {
      const res = await findAllAddress(user_id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '获取列表成功',
          result: res,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 修改地址
  async update (ctx: Context) {
    const address_id = ctx.params.id;
    const address = ctx.request.body;

    try {
      const res = await updateAddress(address_id, address);
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改地址成功',
          result: res,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 删除地址
  async remove(ctx: Context) {
    const id = ctx.params.id;
    try {
      const res = await removeAddress(id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '删除地址成功',
          result: res,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 设置默认地址
  async setDefault(ctx: Context) {
    const id = ctx.params.id;
    const user_id = ctx.state.user.id;

    try {
       const res = await setDefaultAddress(id, user_id);
       if (res) {
         ctx.body = {
          code: 0,
          message: '设置默认地址成功',
          result: res,
         };
       }
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AddressController();
