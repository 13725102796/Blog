---
title: JS操作DOM的方法与实践
date: 2018-04-11 19:04:49
tags: DOM 
categories: 
- JS
---
## DOM的基本介绍（提纲）
###  html文档中的内容以"树形结构"呈现,即大家常说的: 文档树;
###  文档树中的每个组成部分,称为之"节点", 即 Node类型,文档中的每一个具体的节点,都是一个Node对象:节点对象;
###  文档树中,最重要的三类节点是: Document文档节点, Element元素节点, Text文本节点

## 选择页面元素的方法
``` bash 
// html
<h3 id="header" class="red" style="color:green;" title="php.cn">Text</h3>
// js
//获取当前ID为header的节点
document.getElementById('header');
// 获取当前class为red的所有节点，返回一个数组
document.getElementByClassName('red')

// 获取当前h3所有节点，返回一个数组
document.getElementByTagName('h3')
// 获取当前input标签 name为username所有节点，返回一个数组
document.getElementByName('username');

document.querySelector(); //返回第一个匹配元素
document.querySelectorAll(); //返回所有匹配元素

```
## DOM元素的基本操作
* 创建:createElement('p');
* 插入:parentNode.appendChild('p');
* 删除:removeChild('p');
* 更新:replaceChild('p',old);

``` bash 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>实战热身</title>
</head>
<body>
<input type="text" name="info">
<button>提交</button>
<br><br>
<ul></ul>
</body>
<script type="text/javascript">
//美化样式
    let a = document.getElementsByTagName('input')[0];
    let b = document.getElementsByTagName('button')[0];
    console.log(a)
    a.setAttribute('style','height: 8px;width: 258px;border: 1px solid #ccc;margin-top: 6px;font-size: 16px;padding: 20px;float: left;');
b.setAttribute('style','height: 50px;width: 100px;border: 1px solid #ccc;margin-top: 6px;font-size: 20px;background: #FF6A00;color: white;border: none;float: left;');

//获取元素
  let input = document.getElementsByName('info')[0];
  let button = document.getElementsByTagName('button')[0];
  let ul = document.getElementsByTagName('ul')[0];

  button.onclick = function(){
   let li = document.createElement('li');
   li.innerHTML = input.value; //文本框的内容
   ul.appendChild(li); //将用户信息显示到列表中
   input.value = ''; //将文本框内容清空
  }
</script>
</html>
```