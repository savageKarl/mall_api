import { DataTypes } from "sequelize";

import seq from "../db/seq";

const Address = seq.define('zh_addresses', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人',
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '收货人的电话号码'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人的地址',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否默认收货地址，0：不是（不是默认地址）1：是',
  }
});

// Address.sync({ force: true });

export default Address;
