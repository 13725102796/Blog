---
title: git 多账号配置
date: 2021-02-01 00:12:23
tags: git
---
# git 多账号账号切换使用
* 解决密钥问题。默认只有一个密钥，二次创建会覆盖
* 使用哪个账号提交的
  
# 生成两个账号私钥在本地
生成默认的 id_rsa 和id_rsa.pub
ssh-keygen -t rsa -C "你的github注册邮箱1"
在创建第二个的时候必须要重命名 比如 137_id_ras,这样会生成另外两个文件137_id_rsa 和 137_id_rsa.pub
ssh-keygen -t rsa -C "你的github注册邮箱2"

# 在.ssh下面创建config文件
执行 touch config 创建
执行 vim config 编辑
``` bash 
#Default 第一个账号(123456@xxxx.com)

Host default
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/137_id_rsa
#second 第二个账号（38894403@xxxx.com）    
Host zc
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
```
只需要修改 IdentityFile 即可
ssh -T git@zc 可以测试是否配置成功
# 

