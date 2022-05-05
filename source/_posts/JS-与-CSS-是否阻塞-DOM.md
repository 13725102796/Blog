---
title: JS 与 CSS 是否阻塞 DOM
date: 2019-04-14 11:06:45
tags: CSS JS
categories: 
- 浏览器 
---
浏览器的解析渲染过程，解析DOM生成DOM Tree，解析CSS生成CSSOM Tree，两者结合生成render tree渲染树，最后浏览器根据渲染树渲染至页面。

# 所以CSS不会阻塞DOM的解析，因为两者是并行解析的。

但是由于render tree的生成是依赖DOM Tree和CSSOM Tree的，因此CSS必然会阻塞DOM的渲染。
最终生成页面依赖的渲染数 是由DOM Tree和CSSOM Tree组成的，如果CSSOM Tree阻塞了，那么DOM的渲染也就没那么快完成

# JS 会阻塞 DOM 解析
首先浏览器无法知晓JS的具体内容，倘若先解析DOM，万一JS内部全部删除掉DOM，那么浏览器就白忙活了，所以就干脆暂停解析DOM，等到JS执行完成再继续解析。
开发者可以优先考虑使用defer的方式，其次是async方式让页面的JS进行异步执行，
* defer 异步加载， 加载完后会等待Html标签全部解析完才去执行
比如第三方sdk 不影响页面形式的js 都可以延时解析

