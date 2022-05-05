---
title: rem em px详解
date: 2018-05-25 11:40:04
tags: rem em px
categories: 
- CSS
---
# rem em px详解
* px相对长度单位，相对于显示器屏幕分辨率来的
* em相对长度单位，相对于当前对象内文本的字体尺寸来的，值不固定，会继承父级元素字体的大小，未经调整浏览器：16px = 1em 假如父元素为2em，子元素为2em字体实际大小为4em
* rem是css3新增的相对单位，使用rem为元素设置大小时，是相对大小，相对的是html根元素，修改根元素就可以调整所有字体大小，还可以避免字体大小逐层复合的连锁反应，未经调整浏览器：16px = 1rem。



# 移动端适配 相关知识储备
响应式 —— 在css中，针对不同大小的浏览器窗口，用不同的方式相应更新页面的样式。
1inch（英寸） = 25.4mm（毫米） = 6pc（pica，印刷术语，长度为12points） = 72pt（点） = 96px（像素）

em —— 基准是 当前元素的字号（font-size）大小，实际值取决于在哪个元素上应用。
* 基准是当前元素的font-size
* 如果当前元素的字号用的是em，那么当前元素字号的基准是其父元素
* 先算出当前元素的font-size的像素值，再计算其他使用em作为单位的属性值大小

rem —— 是根em的缩写，基准是根元素的字号大小**

视口viewport —— 浏览器窗口中用来渲染页面的可视区域，不包括浏览器的地址栏、工具栏、状态栏等。
相关单位
* vh ——视口高度的1/100
* vw——视口宽度的1/100
* vmin——视口宽度或者高度较小值的1/100
* vmax——视口官渡或者高度较大值的1/100（横竖屏时可以用这两个值）

flexible源码解读

``` bash 
// 立即执行函数，入参是window和document
(function flexible (window, document) {
  var docEl = document.documentElement
  // 文档的root元素
  var dpr = window.devicePixelRatio || 1
  // 获取设备的dpr（返回当前显示设备的物理像素分辨率与css像素分辨率之比），它告诉浏览器应该使用多少屏幕实际像素来绘制单个css像素，

  // adjust body font size
  // 调整body标签的fontsize，fontsize = (12 * dpr) + 'px'
  // 设置默认字体大小，默认的字体大小继承自body，如果子元素没有设置font-size就继承父元素设置的这个默认字号（这个地方有个疑问，为什么以12位基准，是因为浏览器的最小显示的字号是12吗？）
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // 设置根元素的fontsize为clientwidth/10（除以10纯粹是为了计算方便）这个地方也可以直接写10vw（表示可视窗口的宽度的十分之一）
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  // 当页面展示或重新设置大小的时候，重新对rem的px值进行计算
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```



