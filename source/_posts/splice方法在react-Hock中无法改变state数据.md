---
title: splice方法在react Hock中无法改变state数据
date: 2022-01-07 17:11:04
tags: React
categories: 
- React
---

# 例子
``` bash
function fun(){
  const [arr,setArr] = useState([1,2])
  arr.splice(1,3)
  setArr(arr)
}

```
这时候发现是没有效果的。
因为splice是修改原数组，并返回被切掉的元素。
而arr保存的是引用地址
所以要先copy一份arr再操作
const copyArr = arr.slice()  ||  const copyArr = [...arr]

# 正解
``` bash
function fun(){
  const [arr,setArr] = useState([1,2])
  const copyArr = arr.slice() 
  copyArr.splice(1,3)
  setArr(copyArr)
}

```