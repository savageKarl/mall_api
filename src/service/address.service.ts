import Address from '../model/address.model';

interface AddressInfo {
  user_id: number;
  consignee: string;
  phone: string;
  address: string;
}

class AddressService {
  // 创建地址
  async createAddress(address: AddressInfo) {
    return await Address.create(address);
  }

  // 获取地址列表
  async findAllAddress(user_id: number) {
    const res = await Address.findAll({ 
      where: { user_id },
      attributes: ['id', 'consignee', 'phone', 'address'] },
      );
    return res;
  }

  // 修改地址
  async updateAddress(id: number, address: AddressInfo) {
    return await Address.update(address, { where: { id } });
  }

  // 删除地址
  async removeAddress(id: number) {
    return await Address.destroy({ where: { id }});
  }

  // 设置默认地址
  async setDefaultAddress(id: number, user_id: number) {
    await Address.update({ is_default: false }, { where: { user_id } });
    return await Address.update({ is_default: true }, { where: { id } });
  }
}


export default new AddressService();
