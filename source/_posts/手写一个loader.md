---
title: 手写一个loader
date: 2022-04-27 00:04:20
tags: Loader
---
# loader 原理
loader就像一个翻译员，能将源文件翻译后输出新的结果，并且一个文件可以链式的经过几个翻译员。
以.scss文件为例子：
* 先将.scss文件内容交给sass-loader翻译为css
* 在将翻译后的css交给css-loader,找出css中依赖的资源，压缩css
* 再将css-loader输出的内容交给style-loader,转化为通过脚本加载的JavaScript代码

1，本质是一个函数。
参数能获取目标的内容，
结果能传递给下一个loader。

2.自定义loader要使用绝对路径引入。


# 自定义一个loader
* 首先定义一个loader自动在jsx文件中