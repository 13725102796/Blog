---
title: centos 部署 Uni H5打包
date: 2022-08-12 11:26:32
tags: Uni
---

# 大致流程
1. 从window hbuildx 软件中提取构建包 `uniapp-cli`.zip ,放到服务器里面 rz 命令上传,通过`cp 复制文件路径/名称 文件路径/名称`  复制到指定的目录上面。
2. 安装node 环境
  下载 node-v16.16.0-linux-x64.tar.xz
  rz 传到服务器
  tar -xvf node-v16.16.0-linux-x64.tar.xz 解压
  配置环境变量
  vi  /etc/profile
  export NODEJS=/zyc/node-v16.16.0
  export PATH=$PATH:$NODEJS/bin

  触发生效
  source /etc/profile
  设置淘宝镜像源
   npm config set registry http://registry.npm.taobao.org/
   # 检查是否更换成功
   npm config get registry
3. 安装 uniapp-cli 依赖包，以及编译器包
   cd uniapp-cli 到该目录，npm install
  npm install bcrypt less node-sass-china --save
  因为node-sass-china镜像源无法下载需要到github官网去下载
  https://github.com/sass/node-sass/releases/tag/v6.0.1
  
    
4. 
