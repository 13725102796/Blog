---
title: New操作符详解
date: 2018-12-25 08:32:36
tags: New
categories: 
- JS
---
# new操作符做了什么

* 创建一个空的简单JavaScript对象（即{}）；
* 链接该对象（即设置该对象的构造函数）到另一个对象 ；
* 将步骤1新创建的对象作为this的上下文 ；
* 判断返回值 返回对象就用该对象,没有的话就创建一个对象

new是用来做继承的，而创建对象的其实是Object.create(null)。 在new操作符的作用下，我们使用新创建的对象去继承了他的构造函数上的属性和方法、以及他的原型链上的属性和方法
# 手写一个new函数
``` bash 
function new(Func,args){
  let obj = obj.create(null)
  obj._protp_ = Func.prototype
  const result = Func.apply(obj,args)
  return result instanceof Object ? result : obj
}
```