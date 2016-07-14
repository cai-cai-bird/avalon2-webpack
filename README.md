# webpack-avalon2-seed #



### 安装依赖

`$ npm install` - 安装依赖

### npm scripts

`$ npm run start` - 建立开发模式并启动应用程序在 http://localhost:3000

`$ npm run build` - 生成一个静态的未压缩的环境包,可以查看调试 ./dist_tests 目录下

`$ npm run buildp` - 打包理想的生产环境 ./dist 目录下

`$ npm run dev` - 命令行启动热服务


### 开发要求/原则

**_js,_views,_scss 目录结构文件名保持一致**

```
--- ./app
    |--- ./_components (组件目录)
    |--- ./_fonts(字体库)
    |--- ./_images(图片)
    |--- ./_lib(外部库文件)
              |--- jQuery-3.0.0.js
    |--- ./_scss
              |--- base.scss
              |--- variables.scss {scss 全局的变量定义 引入到base.scss}

              |---./home [这是一个业务模块]
                    |--- index.scss
    |--- ./_js
         |--- ./home [业务模块]
              |--- index.js
              |--- search.js
         |--- ./product [业务模块]
              |--- index.js
              |--- order.js
    |--- ./_views
          |--- ./home [业务模块]
              |--- index.html
              |--- search.html
          |--- ./product [业务模块]
              |--- index.html
              |--- order.html
```

### 相关链接

[webpack: <http://webpack.github.io>]

[avalon2: <http://avalonjs.coding.me>]