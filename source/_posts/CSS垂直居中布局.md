---
title: CSS常用垂直居中布局
date: 2018-04-15  20:59:07
tags: CSS
---
# CSS垂直居中布局

### line-height + text-align 文字垂直居中
``` bash
# html
<div class="example">Lorem ipsam.</div>
#css
.example{
  width: 400px;
  background: #afddf3;
  line-height: 50px;
  text-align: center;
}
```

### absolute + margin 

``` bash
# html
<div class="parant">
  <div class="child"></div>
</div>
#css
.parant {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
#  原理：当元素设置为绝对定位后，假设它是抓不到整体可运用的空间范围，所以margin: auto会失效，但当你设置了top:0;bottom:0;时，绝对定位元素就抓到了可运用的空间了，这时你的margin:auto就生效了。
```

### absolute + translate
``` bash
# html
<div class="parant">
  <div class="child"></div>
</div>
#css
.parant {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
# 原理：利用绝对定位时的top 与right设置元素的上方跟左方各为50%，再利用transform: translate(-50%, -50%);位移居中元素自身宽与高的50%就能达成居中的目的了。
```

### Flex + align-items
``` bash
# html
<div class="parant">
  <div class="child"></div>
</div>
#css
.parant {
  display: flex;
  justify-content: center;
  align-item: center
}
```



