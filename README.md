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
npm install typescript ts-node nodemon -D
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

在终端，使用`npx nodemon src/index.ts`

![image-20220109203302453](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220109203302453.png)













