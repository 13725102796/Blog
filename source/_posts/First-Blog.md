---
title: 从零开始搭建我的博客
date: 2018-04-10 11:01:35
tags: Next Hexo Blog
---

# [从零开始搭建我的博客](https://github.com/13725102796/13725102796.github.io) 
### `node v16.14.0` `npm 8.3.1` 
# 搭建步骤：
* GitHub创建个人仓库
* 安装Hexo
* 使用Hexo
* 命令简写

## **GitHub创建个人仓库**
#### 在Github创建新仓库，仓库名应该为：`用户名.github.io` 比如我的仓库名为`13725102796.github.io`

## **安装Hexo**

#### Hexo 是一个快速、简单、强大的博客框架。你可以用Markdown （或其他标记语言）写帖子，Hexo 会在几秒钟内生成带有漂亮主题的静态文件。非常快捷，方便。
#### 我们先来全局安装 Hexo,初始化项目，在切进对应目录：
``` bash
$ npm install -g hexo-cli
$ hexo init Blog
$ cd Blog
```

## **使用Hexo**
#### 创建一篇文章` hexo n "First Blog"`，对应会在/sources/_posts/文件下面生成一个`First-Blog.md` 文件，在里面编辑好博文
#### [修改根目录_config.yml配置文件]()
``` bash
deploy:
  type: git
  repo: https://github.com/13725102796/13725102796.github.io 
  branch: master
```
#### 执行 清除缓存并重新生成静态资源并本地运行
``` bash
$ hexo clean && hexo g && hexo s
```

#### 发布到Github上 ，需要安装一个发布github的插件，再发布
``` bash 
$ npm install hexo-deployer-git --save
$ hexo d
```

#### 通过[https://13725102796.github.io](https://13725102796.github.io) 即可访问

## **命令简写**
#### 新建一篇文章 `hexo n "我的博客"` == `hexo new "我的博客"` 
#### 生成静态资源文件 `hexo g` == `hexo generate `
#### 启动本地服务预览 `hexo s` == `hexo server `
#### 部署到线上 `hexo d` == `hexo deploy `


