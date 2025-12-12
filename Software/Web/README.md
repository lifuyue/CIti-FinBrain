# 花旗杯Web前端

基于[FrontendStarterKit](https://github.com/viccrubs/FrontendStarterKit)的React前端项目。

## 技术

- React
- MobX
- Ant Design

等等，详情请看[FrontendStarterKit](https://github.com/viccrubs/FrontendStarterKit)。

## 运行

1. 安装依赖（建议使用官方源并忽略旧 lockfile）：  
   `npm install --registry=https://registry.npmjs.org --legacy-peer-deps --no-package-lock`
2. 启动开发服务器（webpack 4 在新 Node 版本需 legacy OpenSSL）：  
   `BROWSER=none NODE_OPTIONS=--openssl-legacy-provider npm start`

默认访问地址：`http://localhost:3000/`  
如 macOS 监听不稳定，可用轮询启动：  
`WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 WATCHPACK_DISABLE_CHOKIDAR=true BROWSER=none PORT=3000 HOST=0.0.0.0 NODE_OPTIONS=--openssl-legacy-provider npm start`

## 许可

任何代码都不能用直到项目结束。
