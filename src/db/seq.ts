import { Sequelize } from "sequelize";

import config from '../config/config.default';

const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB } = config;

const seq = new Sequelize(MYSQL_DB as string, MYSQL_USER as string, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
});

seq.authenticate().then(() => {
  console.log('数据库连接成功');
}).catch((e) => {
  console.log('数据库连接成功');
});

export default seq;
