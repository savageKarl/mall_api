import { DataTypes } from "sequelize";

import seq from "../db/seq";

const Goods = seq.define('zh_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称',
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品的图片url',
  },
}, {
  paranoid: true,
});

// Goods.sync({ force: true });

export default Goods;
