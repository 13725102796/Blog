---
title: JS字符串常用的操作方法
date: 2018-04-14 16:04:43
tags: String
categories: 
- JS
---
# JS字符串常用的操作方法
* str.charAt(index) 返回指定index下标的字符 下标从0开始
* str.includes(str1) 方法用于判断str1是否包含在str中，根据情况返回 true 或 false。
* str.indexOf(str1) 方法用于判断str1是否包含在str中，返回存在的下标，无则-1
* str.replace(regx,str) 按照regx的规则，将符合的替换成str
* str.split('分隔符') 将str按照分隔符转化成数组

``` bash
var anyString = "Brave new world";
console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");
// The character at index 0 is 'B'

// -------------------------------------------------------------

// str.includes(str1) 方法用于判断str1是否包含在str中，根据情况返回 true 或 false。 区分大小写
'Blue Whale'.includes('blue'); // returns false
'Blue Whale'.includes('Blue'); // returns true

// -------------------------------------------------------------

//str.indexOf(str1) 方法用于判断str1是否包含在str中，返回存在的下标，无则-1
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);
console.log(indexOfFirst); // expected output: "40"

// -------------------------------------------------------------

// str.replace(regx,str) 按照regx的规则，将符合的替换成str
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
const regex = /Dog/i;
console.log(p.replace(regex, 'ferret'));
// expected output: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"

// -------------------------------------------------------------

//str.split('分隔符') 将str按照分隔符转化成数组
const str = 'The quick brown fox jumps over the lazy dog.';
const words = str.split(' ');
console.log(words[3]);// expected output: "fox"


```
