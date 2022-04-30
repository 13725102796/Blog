---
title: CSS3 新增常用特性
date: 2018-05-23 11:30:25
tags: CSS3
---

``` bash 
# border新增border-img, border-radius
* border-image-source 	用于指定要用于绘制边框的图像的位置
* border-image-slice 图像边界向内偏移
* border-image-width 	图像边界的宽度
* border-image-outset 用于指定在边框外部绘制 border-image-area 的量
* border-image-repeat 用于设置图像边界是否应重复（repeat）、拉伸（stretch）或铺满（round）。
border-image: source slice width outset repeat|initial|inherit;

# box-shadow 
box-shadow:-10px -10px 20px 20px gold;
# text-shadow
text-shadow: 0 0 5px #fff;
# background 新增background-image，background-size background-repeat
# 媒体查询 制作响应式设计
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
@media screen and (min-width: 300px) and (max-width: 500px){
    #wrap div{
        width: 20%;
    }            
}

```
