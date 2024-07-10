---
title: 蓝湖直转Html=》React && Vue
date: 2023-04-10 09:41:47
tags:
---

# 作用
简化，页面绘制流程。高效率生产。摸鱼神器
# 蓝湖
具体到某一张设计稿，点击旁边的代码

可以看到里面含有 Vue Uni React 版本的代码。这里主要讲解React代码怎么用
因为Vue 与 Uni 在单页面开发中存在 `<style scoped>` 属性
可以直接复制代码使用。但是React中的Css没办法通过设置隔离。页面与页面之间的CSS重叠问题。
这里主要解决这个问题

# React 

```bash
<div className="block_3 flex-col">
  <span className="text_10">注册/登录</span>
  <div className="group_17 flex-col" />
  <span className="text_11">手机号</span>
</div>
```
这是一段React页面UI转化的代码，
蓝湖生成的规则都是一个样，换一个页面它还是会定义`group_xx，text_xx`
这就导致页面css重用，页面UI样式错乱问题。

我们需要一个程序将html中的className重新定义，以符合我们的实际需求
像这样
``` bash
<div className={styles.block_3 + " " + styles['flex-col']}>
  <span className={styles.text_10}>注册/登录</span>
  <div className={styles.group_17 + " " + styles['flex-col']} />
  <span className={styles.text_11}>手机号</span>
</div>
# 再把styles变量 引入进来 
import styles from './index.module.scss';
# 把蓝湖的CSS复制到这个index文件里面
```

# 生成工具代码
``` bash
const { src, dest } = require('gulp');
var through = require('through2');
function defaultTask(cb) {
  // place code for your default task here
  // cb();
  return src('src/index.jsx').pipe(through.obj(function (file, encode, cb) {
    let str = file.contents.toString()
    str = str.replace(/className="([^"]+)"/g, function (match, className) {
      const classNames = className.split(' ')
      const strTemp = classNames.map(function (name) {
        if (name.indexOf('-') > -1) {
          return 'styles[\'' + name + '\']'
        } else {
          return 'styles.' + name;
        }
      })
        .join(' + " " + ');
      console.log(strTemp)
      return 'className={' + strTemp + '}'
    })
    file.contents = new Buffer(str)
    this.push(file)
    cb()
  })).pipe(dest('output/'))
}

exports.default = defaultTask

```
