---
title: npm上架流程
date: 2022-06-27 09:53:32
tags: NPM
---

# 步骤流程
* 注册npm账户 ，安装node.js
* 在本地创建自己的npm包
  创建文件夹，名字建议不要与线上包重名
  初始化npm包 npm init
  创建一个index.js文件作为包入口文件（和package.json下的main保持一致）
  编写完善index.js

* 发布npm包
  npm adduser 添加登录用户，请确保当前链接源是官网，使用nrm工具可以快速查看和切换
  npm publish 发布上传包

* 更新npm包
  修改内容，更新版本号
  ``` bash 
  //直接修改package.json中的version
  "version": "1.1.0"
  ```
  npm publish 再次发布


