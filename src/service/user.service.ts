import User from "../model/user.model";
interface GetUserInfoParam {
  id?: number;
  user_name?: string;
  password?: string;
  is_admin?: number;
}
class UserService {

  /** 创建新用户数据 */
  async createUser(user_name: string, password: string) {
    // 插入数据
    try {
      const res = await User.create({ user_name, password });
      return (res as any).dataValues;
    } catch (e) {
      console.log(e)
    }
    return '写入数据库成功';
  }

  /** 查询用户信息 */
  async getUserInfo({id, user_name, password, is_admin} : GetUserInfoParam) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    });
    return (res as any)?.dataValues;
  }

  async updateById({ id, user_name, password, is_admin }: GetUserInfoParam) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, {user_name});
    password && Object.assign(newUser, {password});
    is_admin && Object.assign(newUser, {is_admin});

    const res = await User.update(newUser, { where: whereOpt });
    // console.log(res);
    return res[0] > 0 ? true : false;
  }
}

export default new UserService;
