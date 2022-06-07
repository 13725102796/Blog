---
title: JS 双指针算法
date: 2022-05-21 12:42:48
tags: JS
categories: 
- JS
---

# 双指针 
双指针指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个相同方向（快慢指针）或者相反方向（对撞指针）的指针进行扫描，从而达到相应的目的。

# 案例 对撞指针
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
例如，121 是回文，而 123 不是。
``` bash 
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // 双指针解法 
    x = String(x)
    if(x.length == 1) return true
    let i = 0,j=x.length -1
    while(x.charAt(i) === x.charAt(j) ){
        i++;
        j--;
        if(i >= j ) return true
    }
    return false
};
```
