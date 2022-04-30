---
title: JS经典问题指南
date: 2018-04-18 22:09:19
tags: Javascript
---

## JavaScript的数据类型
* 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol（独一无二的值
* 引用数据类型：对象(Object)、数组(Array)、函数(Function)。

## 基本数据类型与引用类型在存储上有什么区别?
### 1.存储位置不同:
* 基本数据类型：以栈的形式存储, 保存与赋值指向数据本身, 用typeof 来判断类型
* 引用类型：以堆的形式存储, 保存于赋值指向对象的一个指针, 用instanceof 来判断类型 

### 2.传值方式不同：
* 基本数据类型按值传递，无法改变一个基本数据类型的值
* 引用类型按引用传递，应用类型值可以改变

## 判断 js 类型的方式
* 1. typeof
### 可以判断出'string','number','boolean','undefined','symbol'但判断 typeof(null) 时值为 'object'; 判断数组和对象时值均为 'object'

* 2. instanceof
``` bash 
functionA() {}
let a = new A();
a instanceof A //true
// 因为 Object.getPrototypeOf(a) === A.prototype;
```
* 3. Object.prototype.toString.call() 可以判断所有类型
``` bash 
Object.prototype.toString.call(null)//"[object Null]"
Object.prototype.toString.call(undefined)//"[object Undefined]"
Object.prototype.toString.call(Object)//"[object Function]"
```

## 描述以下变量的区别：null，undefined或undeclared
* null 表示"没有对象"
* undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义

#### 变量被声明了，但没有赋值时，就等于undefined。
#### 调用函数时，应该提供的参数没有提供，该参数等于undefined。
#### 对象没有赋值的属性，该属性的值为undefined。
#### 函数没有返回值时，默认返回undefined。
* undeclared :js语法错误，没有申明直接使用，js无法找到对应的上下文。

## for..in 和 object.keys的区别
* Object.keys不会遍历继承的原型属性
* for...in 会遍历继承的原型属性

## JS 中的函数提升
#### JS允许将声明移动到顶部的默认行为称为提升。JS中创建函数的两种方法是函数声明和函数表达式。

``` bash 
# 函数声明
hoisted();
// logs "foo"
function hoisted() {console.log('foo');}

# 函数表达式
notHoisted(); 
#TypeError: notHoisted is not a function
var notHoisted = function() {console.log('bar');};

```

## Js隐式转换
#### 在js中，当运算符在运算时，如果两边数据不统一，CPU就无法计算，这时我们编译器会自动将运算符两边的数据做一个数据类型转换，转成一样的数据类型再计算
#### 这种无需程序员手动转换，而由编译器自动转换的方式就称为隐式转换
``` bash
# 隐式转换规则：

# 1. 转成string类型： +（字符串连接符） 2..转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
# 2. 转成boolean类型：!（逻辑非运算符）
console.log([] == []) // false 
console.log([] == ![]) // true
console.log([] !== []) // true
console.log(NaN != NaN) // true
console.log(null == undefined) // true
console.log(null === undefined) // false
console.log(1 == true) // true
console.log(null > 0) // false
console.log(true + 1) // 2
console.log(undefined + 1) // NaN
console.log({} + 1) // [object Object]1
console.log([] + {}) // [object Object]
console.log([2,3] + [1,2]) // 2,31,2

```

## JS 中 == 和 === 区别是什么？
* 两等号判等，会在比较时进行类型转换；
* 三等号判等(判断严格)，比较时不进行隐式类型转换，(类 型不同则会返回false)；


## ES5 和 ES6 分别几种方式声明变量
* ES5 有俩种：var 和 function
* ES6 有六种：增加四种，let、const、class 和 import














