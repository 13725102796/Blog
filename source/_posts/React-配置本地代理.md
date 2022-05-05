---
title: React 配置本地代理
date: 2020-08-20 23:34:59
tags: React 代理
categories: 
- React
---

# React配置代理

``` bash
# 1.检查自己的create-react-app脚手架若在2.0版本以下，使用对象类型配置代理，在自己项目的package.json文件中配置如下：
"proxy":{
   "/api":{
      "target":"代理服务器的地址",  # 跨域地址
      "changeOrigin": true,    # 是否允许跨域
      "pathRewrite": {        # 重写路径
           "^/api": "/"
       },
    }
}
# 2.若脚手架版本在2.0以上只能配置string类型
"proxy": "代理服务器的地址",
# 多代理配置可以使用中间件的方式 http-proxy-middleware
# 安装 http-proxy-middleware，然后在项目的src目录下建立setupProxy.js文件
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
      createProxyMiddleware('/api', {
        target: '代理地址1',
        secure: false,    # 指定Cookies能否被用户读取
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        },
      }),
      # 配置多个代理继续往下加就可以
      createProxyMiddleware('/api1', {
        target: '代理地址2',
        secure: false,    # 指定Cookies能否被用户读取
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        },
      })
    );
};


```




