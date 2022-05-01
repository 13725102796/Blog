---
title: React 组件生命周期
date: 2022-04-17 16:21:34
tags: React 生命周期
---
# 常用单个组件的生命周期
1. 初始化的生命周期
* constructor
* static getDerivedStateFromProps
* render
* componentDidMount

2. 更新的生命周期
* static getDerivedStateFromProps
* shouldComponentUpdate
* render
* getSnapshotBeforeUpdate
* componentDidUpdate

3. 错误的生命周期
* static getDerivedStateFromError
* componentDidCatch



# 只执行一次
* constructor
* componentWillMount
* componentDidMount

# 执行多次
* render
* 子组件-componentWillReceiveProps
* componentWillUpdate
* componentDidUpdate

# 执行顺序，类似事件捕获+事件冒泡
App： constructor --> componentWillMount --> render -->
parent: constructor --> componentWillMount --> render -->
child: constructor --> componentWillMount --> render -->
componentDidMount (child) --> componentDidMount (parent) --> componentDidMount (App)



