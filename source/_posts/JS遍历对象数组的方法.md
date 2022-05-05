---
title: JS遍历数组的方法
date: 2018-04-10 19:10:57
tags: Array 
categories: 
- JS
---
# js遍历数组的几种方法
* for 最快
* forEach (不产生新的数组，效率没有map快)
* map （产生新的数组）
* for.......of 
* for....in(效率最慢，一般用与遍历对象)
* some and every (返回布尔值)
* filter （返回符合条件的某一项） findIndex （返回符合条件的下标，无则-1）
* while (条件循环)

## 第一种：for循环，也是最常见的
``` bash
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```
## forEach
``` bash 
arr.forEach(function(item){
  console.log(item)
})
```
## map
``` bash 
const newArr = arr.map(function(item){
  console.log(item)
  return item
})
```
## for...of
``` bash 
for(let item of arr){
  console.log(item)
}
```
## for.....in 遍历对象
``` bash 
for(let key in obj){
  console.log(key + '---' + obj[key] )
}
```

## some and every (返回布尔值)
``` bash 
const array = [1, 2, 3, 4, 5];
const someBool = array.some((item)=>{
  if(item > 2) {
    // 满足条件中止循环
    return true
  }
})
// someBool 为true
const everyBool = array.every((item)=>{
  if(item > 2) 
    return true
  }
  // 只要有一项不符合就中止循环 return false
})
// everyBool为false
```
## filter （返回符合条件的所有项） findIndex （返回符合条件的下标，无则-1）
``` bash 
const array = [1, 2, 3, 4, 5];
const filterItem = array.filter((item)=>{
  if(item > 2) {
    return item
  }
})
// filterItem: [3,4,5]
const findIndex = array.findIndex((item)=>{
  if(item > 2) {
    return item
  }
})
// findIndex: 2
```
## while
``` bash 
let i = 0
while(i < arr.length){
  i++
}
```




