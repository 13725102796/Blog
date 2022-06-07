---
title: JS 回溯算法
date: 2022-05-21 13:02:54
tags: JS
categories: 
- JS
---

# 回溯算法
回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。
解题步骤
* 1.定义一个解空间，它包含问题的解；
* 2.利用适于搜索的方法组织解空间；
* 3.利用深度优先法搜索解空间；
* 4.利用限界函数避免移动到不可能产生解的子空间。

# 案例
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。（不包含重复的数组）
示例:
输入: nums = [1,2,3]
输出:[3][1][2][1,2,3][1,3][2,3][1,2][]

``` bash
function allResult(nums){
  let arr = [[]]
  function digui(combine,idx){
    combine.push(nums[idx])
    arr.push([...combine])  
    while(idx !== nums.length-1) {
      idx++
      digui([...combine],idx)
    }
  }
  nums.map((item,idx)=>{
    digui([],idx)
  })  
  return arr
}
```