---
title: 浏览器BOM和JS中的DOM
date: 2018-05-14 10:09:35
tags: BOM DOM
---

JavaScript是一种运行在客户端的脚本语言 （Script 是脚本的意思）,它有三部分组成 ：ECMAScript 语法 ， DOM(页面文档对象模型) ，BOM(浏览器对象模型)而Web API则包含了DOM和BOM

# 什么是BOM
BOM（Browser Object Model）即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。

BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性 ，但是BOM 缺乏标准，JavaScript 语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C，BOM 最初是Netscape 浏览器标准的一部分。

# BOM的构成部分
是window顶级对象 ，也是JS访问浏览器窗口的一个接口。
其中包含： document location navigator screen history

# window对象的常见的事件
* 窗口加载事件 window.onload 当文档内容完全加载完成会触发该事件(包括图像、脚本文件、CSS 文件等), 就调用的处理函数。(JS代码都写在加载事件里面)
* 调整窗口大小的事件 window.onresize window.innerWidth 获取当前屏幕的宽度
* window.setTimeout(调用函数， [延迟的毫秒数]) window.clearTimeout(timeoutID) setInterval clearInterval

# 什么是 DOM
DOM 英文全称“Document Object Model”，译为“文档对象模型”。
DOM 是一个与平台和编程语言无关的接口，通过这个接口程序和脚本可以动态的访问和修改文档的内容、结构和样式。

# DOM 的组成
核心DOM - 针对任何结构化文档的标准模型。
XML DOM - 针对 XML 文档的标准模型。
HTML DOM - 针对 HTML 文档的标准模型。
