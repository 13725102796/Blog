---
title: JS数组常用的操作方法
date: 2018-04-13 11:38:05
tags: Array
categories: 
- JS
---
## JS数组常用的操作方法
* Array.length 获取数组长度
* Array.shift() Array.unshift()  Array.push() Array.pop()
* Array.concat(a1,a2....) 数组合并
* Array.reverse() 数组元素颠倒
* Array.join('拼接字符') 数组转字符串
* Array.indexOf(item) ||  Array.includes(item) 判断Item 是否存在数组里面 
* Array.fill(填充val，下标1，下标2) 数组填充
* [...new Set(arr)]数组去重 || Array.from(new Set(arr))
* Array.slice(begin,end) 这一对象是一个由 begin 和 end 决定的原数组的浅拷贝


``` bash 
// Array.length 获取数组长度
const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];
console.log(clothing.length); // 4

// ---------------------------------------

// Array.shift() Array.unshift()  Array.push() Array.pop()
const array1 = [1, 2, 3];
// 往头部插入
array1.unshift(4, 5); 
// array1: [4,5,1,2,3] 
// 往头部删除
array1.shift() 
// array1: [5,1,2,3] 
// 往尾部插入
array1.push(4)
//  array1: [5,1,2,3,4] 
// 往尾部删除
array1.pop()
// array1: [5,1,2,3]

// -------------------------------------------------------

//Array.reverse() 数组元素颠倒
const array1 = ['one', 'two', 'three'];
array1.reverse() // ["three", "two", "one"]

// -------------------------------------------------------

// Array.join('拼接字符') 数组转字符串
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"

// -------------------------------------------------------

// Array.indexOf(item) ||  Array.includes(item) 判断Item 是否存在数组里面
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));// expected output: 1
console.log(beasts.includes('bison'));// expected output: true

// -------------------------------------------------------

// Array.concat(a1,a2....) 数组合并
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);// ["a", "b", "c", "d", "e", "f"]

// -------------------------------------------------------

// Array.fill(填充val，下标1，下标2) 数组填充
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // [1, 2, 0, 0]

// -------------------------------------------------------

//*[...new Set(arr)]数组去重 || Array.from(new Set(arr))
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr)) //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]

// -------------------------------------------------------

// Array.slice(begin,end) 这一对象是一个由 begin 和 end 决定的原数组的浅拷贝
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]

console.log(animals.slice());
// expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

```
