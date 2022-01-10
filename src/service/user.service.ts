class UserService {
  async createUser(user_name: string, password: string) {
    // todo: 写入数据库
    return '写入数据库成功';
  }
}

export default new UserService;
