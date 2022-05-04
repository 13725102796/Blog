---
title: 提交PR完整流程
date: 2022-04-30 13:39:11
tags: PR
---

# 首先，fork项目到本地
1. 访问想要PR的github项目
2. 点击Start旁边的Fork，fork到自己的仓库
3. 通过git clone xxx 下载到本地
   
# 创建Issues
1. Issues标题格式规范
`[标签] 标题 ` 的格式: "[bug] 点击获取验证码的时候有问题"
2. 内容规范
``` bash 
## 背景

- 描述你希望解决的问题的现状
- 附上相关的 issue 地址

## 思路

描述大概的解决思路，可以包含 API 设计和伪代码等

## 跟进

后续编辑，附上对应的 Pull Request 地址，可以用 `- [ ] some task` 的方式。


# 案例
标题：[RFC] 框架统一错误码
# 背景
Egg 生态插件众多，研发流程可能会抛出各种框架、插件异常，开发者难以自行定位和解决

* 没有统一的错误引导文档，目前的文档分散在官网、语雀各个空间里；错误和文档之间没有建立联系
* 一些底层 sdk 的抛错已经丢失了链路信息，定位很困难。例如：mysql 客户端抛 ACCESS_DENIED_ERROR，已经在最后环节，但是问题可能是在上层 SDK 的使用上
# 目标
* 所有框架、中间件抛出的异常信息，带上对应的 FAQ 自查文档；向下兼容对非统一 Error 的错误展示
* 覆盖研发流程的所有阶段：CLI 命令、应用启动、运行时
* 逐步对框架和中间件使用统一的 Error 改造，补充 FAQ 文档

# 方案
具体实现的大致思路...

``` 

3. 拓展词汇缩写
WIP：work in progress 进展中，比如 The next major version of Vue (WIP)
RFC：request for comments 请求意见稿，
PR：pull request 请求合并
CR：code review 代码审查
BTW： By the way 顺便说一下
FYI：For your information 供您参考
ASAP：As soon as possible马上，尽快
LGTM：Look good to me 看起来不错，代码已review，可以合并

# 认领Issues,对Issues打标签，指派给某个开发者
该仓库的维护者可以对这个Issues做一些事情：
* 指派开发者去修复这个Issues
* 打标签 Labels Assignees 
* 创建指定分支去维护

# 在Fork到本地的代码，修复了bug后，推送到远程仓库，开始提交PR
在远程仓库项目主页可以看到提交记录旁边存在两个按钮Contribute和Fetch-upstream
点击Contribut -》 点击 Open pull request -》 Create pull request
输入本次提交的标题和描述 -》 点击Create pull request

此时 已经完成了PR的提交了
原项目的管理者可以到项目的Pull request 去合并完成整个Issues的修复


# 测试git切换账号提交
  

