---
title: JS 滚动窗口视图算法
date: 2022-05-21 12:52:37
tags: JS
categories: 
- JS
---

# 滑动窗口算法
滑动窗口算法在一个特定大小的字符串或数组上进行操作，而不在整个字符串和数组上操作，这样就降低了问题的复杂度，从而也达到降低了循环的嵌套深度。

# 案例 
无重复字符的最长子串
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
``` bash 
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 窗口视图拖动
    var maxL = 0
    var i = 0
    while(s.length >= i) {
        var j = i+1      
        while(s.length >= j){
            var tmpStr = s.substring(i,j)
            maxL = Math.max(maxL,tmpStr.length)
            if(tmpStr.indexOf(s.charAt(j)) > -1){
              break  
            }
            j++
        }
        i++
    }
    return maxL
};
```
