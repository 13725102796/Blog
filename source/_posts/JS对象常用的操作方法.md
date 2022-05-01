---
title: JS对象常用的操作方法
date: 2018-04-11 21:19:19
tags: Object 
---
## JS对象常用的操作方法
* Object.assign(obj1,obj2) 对象合并，相同key后者替换前者
* JSON.parse(JSON.stringify(obj1))对象深拷贝
* Object.values(obj) 枚举对象属性值的数组 Object.keys(obj) 枚举对象keys的数组
* Object.prototype.toString.call(obj) === '[object object] 判断对象 || constructor

``` bash 
// 复制一个对象
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }

// 对象深拷贝Deep Clone
const  obj1 = { a: 0 , b: { c: 0}};
let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;

//obj3: { a: 0, b: { c: 0}}

// Object.values(obj) Object.keys(obj)
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c'] 
console.log(Object.keys(obj)); // ['0', '1', '2']

// Object.prototype.toString.call(obj) === '[object object]'
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true

```

