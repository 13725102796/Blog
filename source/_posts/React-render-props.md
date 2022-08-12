---
title: React render props
date: 2022-07-27 10:58:48
tags: render props
categories: 
- React
---
# Render Props
术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
该函数的返回值 可以是一个 ReactElement

# Render Props 解决的问题
* 组件复用性的问题 
  以往我们需要通过高阶组件去复用其内部的逻辑与方法，但是不想复用其中的视图，或者只是想复用部分的数据
* 让组件可以动态的处理一些问题，而不是全量复制。特殊化处理。
* 类似于vue中的slot
  
# Render Props 注意事项
* 在使用ts进行类型定义时，必须声明该类型是一个函数
* 它的命名不一定是render ，也可以是children或者其他
``` bash 
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

