---
title: 移动端1px像素
date: 2018-05-26 19:33:47
tags: 1px
categories: 
- Issue
---
# 移动端1px像素起源
在移动端，css中的1px并不等于移动设备的1px，因为手机屏幕有不同的像素密度。window中的devicePixelRatio就是反应css中像素与真实像素的比例，也就是设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。所以造成了通过css设置1px，在移动端屏幕上会变粗。

# 解决方案一：使用伪类缩放
使用伪类缩放需要主要的是：
* 设置全边框的时候，box-sizing要设置为border-box，否则伪元素上下左右各会多1px
* 需要将父元素设置为relative
* 注意 transform 的起点，上边距要用左上角，下边距用左下角

``` bash 
/* 下边框 */
.one-px-border2:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid red;
  transform: scaleY(.5);
  transform-origin: left bottom;
}

```
