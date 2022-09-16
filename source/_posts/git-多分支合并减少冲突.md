---
title: git 多分支合并减少冲突
date: 2022-09-07 18:24:35
tags: git
---

# git 在开发生产环境产生的问题
一般情况所存在的主要分支
* master 生产
* hotfix 用于修复生产bug的专属分支
* main 开发分支
  
问题
在多人协作开发的时候，大家都往main提交代码，甚至有时候直接在main上改，导致main的版本已经超前了master很多很多，在下一次合并master的时侯会产生很多冲突。

# 提交与合并原则
* 在hotfix 修复完 bug 合并到 master 上时，用 main 去合并一下 master，让生产修复的bug在测试环境也生效
* 准备发生产时，先用 main 去合并 master，再用master去合并main。
  
