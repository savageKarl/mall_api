# 一，项目的初始化

## 1 npm初始化

```
npm init -y
```

生成`package.json`：

- 记录项目的依赖

## 2 git初始化

```
git init
```

生成`.git`隐藏文件夹，git的本地仓库

## 3 创建readme文件

## 4 typescript开发环境初始化

```
npm install typescript ts-node -D
```

生成tsconfig.json 文件

```
npx tsc --init
```

# 二，搭建项目

## 1 安装koa框架

```
npm install koa -S
```

安装koa的第三方声明文件
```
npm i --save-dev @types/koa
```



## 2 编写最基础的app

创建`src/main.ts`，内容如下：

```typescript
import Koa from 'koa';

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello, api';
});

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
```

## 3 测试

在终端，使用`npx ts-node src/index.ts`

![image-20220109203302453](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220109203302453.png)

# 三，项目的基本优化

## 1 自动重启服务

```
npm i nodemon -D
```

编写`package.json`脚本

```json
 "scripts": {
    "dev": "nodemon -e ts --exec npx ts-node ./src/main.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

执行`npm run dev`启动服务

![image-20220109204541865](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220109204541865.png)

## 2 读取配置文件

安装`dotenv`，它读取根目录中的`.env`文件，将配置写到`process.env`中

```
npm install dotenv -S
```

创建`.env`文件，内容如下：

```
APP_PORT=8000
```

创建`src/config/config.default.ts`文件，内容如下：

```typescript
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.APP_PORT);

export default process.env;

```

改写`main.ts`，内容如下：

```typescript
import Koa from 'koa';

import config from './config/config.default';

const { APP_PORT } = config;

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello, api2';
});

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

# 四，添加路由

路由：根据不同的URL，调用对应处理器函数

## 1 安装koa-router

```
npm install @koa/router -S
```
安装第三方声明文件
```
npm i --save-dev @types/koa__router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 2 编写路由

创建`src/router`目录，编写`user.route.ts`文件，内容如下：

```typescript
import Router from '@koa/router';

const router = new Router({ prefix: '/users' });

// GET /user/
router.get('/', (ctx, next) => {
  ctx.body = 'hello user';
});

export default router;

```

## 3 改写main.ts

```typescript
import Koa from 'koa';

import config from './config/config.default';
import userRouter from './router/user.route';
const { APP_PORT } = config;

const app = new Koa();

app.use(userRouter.routes())
app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

# 五，目录结构的优化

## 1 将http服务和app业务拆分

创建`src/app/index.ts`

```typescript
import Koa from 'koa';

import userRouter from '../router/user.route';

const app = new Koa();

app.use(userRouter.routes());

export default app;

```

改写`src/main.ts`，内容如下：

```typescript
import config from './config/config.default';
import app from './app/index';
const { APP_PORT } = config;


app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

## 2 将路由和控制器拆分

路由：解析URL，分发给控制器对应的方法。

控制器：处理不同的业务

改写`user.route.ts`

```typescript
import Router from '@koa/router';
import userController from '../controller/user.controller';

const { register, login } = userController;

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', register);

// 登录接口
router.post('/login', login);
export default router;

```

创建`controller/user.controller.ts`

```typescript
import {Context, Next} from 'koa';

class UserController {
  async register(ctx: Context, next: Next) {
    ctx.body = '用户注册成功';
  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;

```

# 六，解析body

## 1 安装koa-body

```
npm install koa-body -S  
```

## 2 注册中间件

改写`app/index.ts`

```typescript
import Koa from 'koa';
import koaBody from 'koa-body';
import userRouter from '../router/user.route';

const app = new Koa();

app.use(koaBody());
app.use(userRouter.routes());

export default app;

```

![image-20220110204902955](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220110204902955.png)

## 3 解析请求数据

改写`user.controller.ts`

```typescript
import {Context, Next} from 'koa';

import userService from '../service/user.service';

const { createUser } = userService;
class UserController {
  async register(ctx: Context, next: Next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const {user_name, password} = ctx.request.body;
    // 2. 操作数据库
    const res = await createUser(user_name, password);
    console.log(res);
    // 3. 返回结果
    ctx.body = ctx.request.body;
  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;

```

## 4 拆分service层

serbice层主要用于做数据库处理

创建`src/service/user.service.ts`

```typescript
import {Context, Next} from 'koa';

import userService from '../service/user.service';

const { createUser } = userService;
class UserController {
  async register(ctx: Context, next: Next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const {user_name, password} = ctx.request.body;
    // 2. 操作数据库
    const res = await createUser(user_name, password);
    console.log(res);
    // 3. 返回结果
    ctx.body = ctx.request.body;
  }

  async login(ctx: Context, next: Next) {
    ctx.body = '登录成功';
  }
}

export default new UserController;

```

















































