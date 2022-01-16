import {Context, Next} from 'koa';

import jwt from 'jsonwebtoken';

import userService from '../service/user.service';
import errType from '../constant/err.type';


import configDefault from '../config/config.default';

const { JWT_SECRET } = configDefault;

const { createUser, getUserInfo, updateById } = userService;
const { userResigterEror } = errType;
class UserController {
  /** 注册 */
  async register(ctx: Context, next: Next) {
    // 1. 获取数据
    const {user_name, password} = ctx.request.body;

    try {
      // 2. 操作数据库
      const res = await createUser(user_name, password);
      console.log(res);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (e) {
      console.log(e);
      ctx.app.emit('eror', userResigterEror, ctx);
    }

  }

  /** 登录 */
  async login(ctx: Context, next: Next) {
    const { user_name, password } = ctx.request.body;
    

    // 1. 获取用户信息（在token的payload中，记录id， user_name， is_admin）
    try {
      const res = await getUserInfo({ user_name });
      const { password, ...userRes } = res;
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result: {
          token: jwt.sign(userRes, JWT_SECRET as string, { expiresIn: '1d' }),
        },
      };
      
    } catch (e: any) {
      console.error(e);
    }
  }

  /** 修改密码 */
  async changePassword(ctx: Context, next: Next) {
    // 1，获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;

    console.log(id, password)
    // 2，操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: '',
      };
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: '',
      }
    }
    // 3，返回结果
    
  }
}

export default new UserController;
