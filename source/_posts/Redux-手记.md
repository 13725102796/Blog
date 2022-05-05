---
title: Redux 手记
date: 2020-04-14 15:35:45
tags: Redux
categories: 
- React
---

# 什么是Redux 
Redux 是 JavaScript 状态容器，提供可预测化的状态管理
可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。

# 核心概念
``` bash 
# 首先用一个普通的对象来描述 state
{
  visibilityFilter: 'SHOW_COMPLETED'
}
# 想要更新state中的数据，你需要发起一个action（Action 就是一个普通 JavaScript 对象）
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

# 此刻的action 和 state 并没有任何关联。reducer 可以一个接收 state 和 action，并返回新的 state 的函数。

function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
}

```

# 三大原则
* 单一数据源 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
* State 是只读的。 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
* 使用纯函数来执行修改。 为了描述 action 如何改变 state tree ，你需要编写reducers。
