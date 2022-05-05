---
title: npm包classNames详解
date: 2021-02-04 10:51:38
tags: classNames
categories: 
- NPM
---

# classnames 快速组合CSS类
在前端开发中，我们经常需要JS来判断生成DOM节点CSS类，比如：
``` bash 
let className='btn-primary';
if(active){
  className+=' active';
}
return <div className={className}>Save</div>;
```
在上述代码中，我们需要判断active变量来控制生成的按钮的CSS样式是否是激活状态，在实际开发中，可能会有更多的类似这样的样式控制逻辑，从而干扰阅读业务逻辑代码，使得代码变得很“脏”。

classnames 库对CSS样式类操作进行了封装，方便我们快速使用：

``` bash 
const classNames = require('classnames');

return <div className={classNames('btn-primary',{ active })}>Save</div>;

# 更多用法
classNames('foo', 'bar'); // => 'foo bar' 
classNames('foo', { bar: true }); // => 'foo bar' 
classNames({ 'foo-bar': true }); // => 'foo-bar' 
classNames({ 'foo-bar': false }); // => '' 
classNames({ foo: true }, { bar: true }); // => 'foo bar' 
classNames({ foo: true, bar: true }); // => 'foo bar' 

```





