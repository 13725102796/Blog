---
title: Egg 的初步认识
date: 2020-07-26 21:58:25
tags: Egg
categories: 
- Node.js
---
# Egg.js 是什么?
Egg.js 为企业级框架和应用而生，我们希望由 Egg.js 孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。
通过 Egg，团队的架构师和技术负责人可以非常容易地基于自身的技术架构在 Egg 基础上扩展出适合自身业务场景的框架。
Egg 的插件机制有很高的可扩展性，一个插件只做一件事（比如 Nunjucks 模板封装成了 egg-view-nunjucks、MySQL 数据库封装成了 egg-mysql）。Egg 通过框架聚合这些插件，并根据自己的业务场景定制配置，这样应用的开发成本就变得很低。

优势：
* Egg 奉行『约定优于配置』，按照一套统一的约定进行应用开发，减少开发人员的学习成本，
* 没有约定的团队，沟通成本是非常高的，比如有人会按目录分栈而其他人按目录分功能
特性： 
* 提供基于 Egg 定制上层框架的能力
* 高度可扩展的插件机制
* 内置多进程管理
* 基于 Koa 开发，性能优异
* 框架稳定，测试覆盖率高
* 渐进式开发

# 主要约定文件目录
* config 配置
* middleware
* Router
* Controller
* service

# 内置对象
* Application
* Context
* Request & Response
* Controller（类）
* Service
* Helper
* Config
* Logger
* Subscription

# 总结
express 是基于nodejs开发的框架，但是会产生很多callback（回调地狱）
为了解决callback，koa支持async await的方式
而egg则基于koa集成多种内置对象，以及各种约定，让多人协作开发更友好，还可以安装各种各样的插件来实现想要功能



