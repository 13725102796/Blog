---
title: redis use in mac os
date: 2024-08-17 17:20:21
tags:
---

1、安装Homebrew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


brew update

2、使用Homebrew安装Redis
brew install redis

3、启动Redis服务
启动
brew services start redis

临时启动
redis-server /usr/local/etc/redis.conf

4、验证Redis安装

redis-cli

5、设置Redis自动启动
brew services start redis
brew services stop redis

6、配置Redis
vim /usr/local/etc/redis.conf
按i进入编辑模式；
初始化配置密码 
requirepass mypassword
按esc退出编辑模式
保存并退出
:wq!
重启redis
brew services restart redis



