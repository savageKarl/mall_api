# 项目说明

使用 `koa2 + typescript` 开发的商城后端api，该项目使用的典型的MVC设计模式，其授权机制的代码在这类项目中是通用的。

项目使用的使用`mysql` 数据库

## 安装

```
git clone https://github.com/savage181855/mall_api.git
```

## 项目结构

```
docs                 存放说明文档
node_modules         依赖目录
src                  源代码
    app              统一定义 app
    config           配置文件
    constant         项目常量
    controller       控制器层，处理请求
    db               连接数据库
    middleware       抽离通用中间件
    model            模型层，对应数据库表
    router           路由器层，转发请求给控制器
    service          服务层，进行操作数据库
    upload           存放上传的图片
    model            模型层，对应数据库表
    index.ts         入口文件
test                 测试文件
types                存放声明文件
.env                 环境变量配置文件
```

## 项目运行

需要安装`mysql`数据库，然后创建一个数据库，并且在`.env`配置文件里面进行配置连接数据库的参数即可。

以上步骤完成后，运行命令

```
npm run dev
```