---
title: CSS经典规则
date: 2018-04-16  21:13:34
tags: CSS
categories: 
- CSS
---
#  CSS经典规则

### 使用方式 及 权重
``` bash
1.内联：直接在HTML元素上使用
<p style="color: red"></p>
2.外部:在工作空间中创建单独的CSS文件，然后在创建的每个web页面中链接它们
<head>
<link rel="text/css" href="url">
</head>
3. web 页面的 head 元素在其中实现了内部 CSS。
<head>
<style>
p{
  color: red;
}
</style>
</head>

# 权重优先级 !important -> 内联 -> 最后读取的
```

### 伪类和伪元素是什么？如何区分？
* 伪类是用来定义元素特殊状态的，他可以用来设置鼠标悬停样式、元素获取焦点样式、设置链接样式等。如常见的 hover、active、link 等都是伪类
*  伪元素也称为伪对象，它不存在于 DOM 文档中、是一个虚拟的元素。它可以用来代表某个元素的子元素，但是这个子元素并不存在于文档树中。

``` bash
# 伪类和伪元素的根本区别在于：是否创造了新的元素。
# html 
<div>
    <p class="one">红色</p>
    <p>黑色</p>
</div>
#css 伪类
p:first-child{
  color:red;
}
# css 伪元素
.one {
  color:red;
}

```
### BFC 规范（块级格式化上下文：block formatting context）
#### BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。
#### 使得当前bfc区域内的元素都变为行内元素（块级格式化上下文）
* 1.浮动元素不为none；
* 2.position不为static；
* 3.display:inline-block；display:table-cell；display:table-caption；
* 4.overflow 计算值(Computed)不为 visible 的块元素
* 5.display:inline-flex;

### IFC指的是行级格式化上下文，它有这样的一些布局规则：
* （1）行级上下文内部的盒子会在水平方向，一个接一个地放置。
* （2）当一行不够的时候会自动切换到下一行。
* （3）行级上下文的高度由内部最高的内联盒子的高度决定。









