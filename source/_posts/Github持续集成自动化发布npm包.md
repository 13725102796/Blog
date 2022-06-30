---
title: Github持续集成自动化发布npm包
date: 2022-06-27 11:03:18
tags: NPM
---

# 遇到的问题
我们发布插件不可能每次都 npm run build 然后 npm login npm publish，这属实有点麻烦，能不能简单一点，我提交个代码或者合并代码的时候就发布呢？
那就是持续集成，自动化发布了。

# 什么是持续集成
持续集成指的是，频繁地（一天多次）将代码集成到主干。

它的好处主要有两个。

* 快速发现错误。每完成一点更新，就集成到主干，可以快速发现错误，定位错误也比较容易。
* 防止分支大幅偏离主干。如果不是经常集成，主干又在不断更新，会导致以后集成的难度变大，甚至难以集成。
持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。它的核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。


# 实现步骤
* 代码托管GitHub
* 找到Actions创建workflow模板
  找到Publish Node.js Package 去 初始化config，并保存。
  项目中即可生成下列文件
  .github/workflows/npmpublish.yml

* 同步远程分支，并修改npmpublish.yml
* npmpublish.yml 文件解释
  name 此工作流的名称。
  on 触发条件，上述文本表示当master分支合并和推送时会触发workflow。
  jobs 工作集合，例如jobs内部的build、publish-npm表示具体的工作任务的ID，可以自定义。
  needs 表示当前的job依赖与另外一个job，例如上面的publish-npm依赖于build。
  runs-on 表示工作所在的虚拟机操作系统，目前可选的系统有ubuntu-latest、ubuntu-18.04、ubuntu-16.04、windows-latest、windows-2019、windows-2016、macOS-latest、macOS-10.14。
  steps 表示job所执行的 actions 和 commands 集合。

* 添加npm access Tokens 
  登陆npm - accessTokens - Generate New Token 获取到token
  在github对应项目/settings/secrets/dependabot 上 New secret 保存，
  名字要和npmpublish.yml设置的保持一致，一般不做修改: npm_token

* 提交之后就会自动构建更新npm










