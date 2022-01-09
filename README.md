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





