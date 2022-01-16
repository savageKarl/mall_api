import { DataTypes } from "sequelize";

import seq from "../db/seq";
import Goods from "./goods.model";

const Cart = seq.define('zh_carts', {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品的id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户的id',
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品的数量',
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '商品是否选中',
  }
});

// Cart.sync({ force: true });

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info',
});

export default Cart;