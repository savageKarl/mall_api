import User from "../model/user.model";
interface GetUserInfoParam {
  id?: number;
  user_name?: string;
  password?: string;
  is_admin?: number;
}
class UserService {
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
    console.debug(res)
  }
}

export default new UserService;
