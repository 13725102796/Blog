---
title: git 多账号配置
date: 2021-02-01 00:12:23
tags: git
categories: 
- git
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
ssh -T git@github.com 可以测试是否配置成功
`配置成功会显示当前用户名` 这个很重要，因为当你想切换用户的时候没有这个不行
通过设置 
git config --global user.name "13725102796"
git config --global user.email "1439655764@qq.com"
还没有生效，因为ssh-add的代理始终指向默认的
# 通过ssh-add删除代理
查看 ssh-add -l
删除 ssh-add -D
添加 
ssh-add ~/.ssh/id_rsa 
ssh-add ~/.ssh/137_id_rsa 

# 添加代理后还不可以，需要修改提交的git clone ssh链接
* 还没clone的可以通过 来拉取项目，这样可以让ssh-add正确代理
git clone zy@:18820677498/Blog.git 
原来是 git@github.com:18820677498/Blog.git

* 已经clone的 可以切换到当前项目下，命令行执行
`vim .git/config`
打开config文件 按i去修改，按esc退出修改，再按 `:qw!` 保存修改  

