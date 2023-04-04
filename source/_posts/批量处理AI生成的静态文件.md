---
title: 批量处理AI生成的静态文件
date: 2023-04-04 14:51:55
tags: React Gulp 
---

# 批量处理AI生成的静态文件
起因是，我需要将一段不合格的jsx文件 转化成 合格的jsx文件
用过React 都知道。在SPA应用下。css的状态是共享的。需要将其私有化。
只能通过定义一个 index.module.scss
再通过 引人styles的方式去使用，将其私有化 
整个过程类似vue scoped 的效果。但是比较繁琐。
``` bash
# 转化前
<div className="group_1 flex-row">
  <div className="image-text_4 flex-row justify-between">
    <div className="box_4 flex-col" />
    <div className="text-group_4 flex-col">
      <span className="text_4">【自然探索类】</span>
      <span className="text_5">科技创新类-变废为宝·争当环保先锋研学课程</span>
    </div>
  </div>
</div>

#转化后
<div className={styles.group_1 + " " + styles['flex-row']}>
  <div className={styles['image-text_4'] + " " + styles['flex-row'] + " " + styles['justify-between']}>
    <div className={styles.box_4 + " " + styles['flex-col']} />
    <div className={styles['text-group_4'] + " " + styles['flex-col']}>
      <span className={styles.text_4}>【自然探索类】</span>
      <span className={styles.text_5}>科技创新类-变废为宝·争当环保先锋研学课程</span>
    </div>
  </div>
</div>

```

# 思路
* 首先批量处理，需要使用工具Gulp，定义一个gulpfile 文件
* 写一个任务，将文件内容提取出来
* 再将内容执行批量替换操作
* 操作完，将内容输出到新的文件，保存下来
  
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
