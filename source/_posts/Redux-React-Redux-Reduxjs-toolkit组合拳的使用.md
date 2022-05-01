---
title: Redux React-Redux @Reduxjs/toolkit组合拳的使用
date: 2021-04-20 21:18:31
tags: Redux 
---

# 安装
因为redux不仅仅是react专用的状态管理工具，所以需要用到react-redux来帮助我们更好的在react项目中使用它
@reduxjs/toolkit 是状态管理使用便捷的工具
``` bash 
# NPM
npm install @reduxjs/toolkit react-redux redux
```
# 使用
``` bash
# 创建一个reducer  counter.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions
export default counterSlice.reducer

# 集中到store里面
# 引入刚刚的创建的counter.js
import counterSlice from "./counter"
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer:{
    counter: counterSlice
  } 
})

export default store

# 集成到入口文件， 通过react-redux组件<Provider>传递到全局
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import App from './App'
import store from './reduces/index'
import { Provider } from 'react-redux'
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

# 某个组件内部调用

import { Link } from 'react-router-dom'
import HightClock from '../hightComponents/clock'
import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented } from './../reduces/test'
export default HightClock((props)=>{
  # useSelector 用于获取值
  const count = useSelector(state => state.counter.value)
  # useDispatch() 用于触发action
  const dispatch = useDispatch()
  return (
    <>
      <h1>About</h1>
      <h2 onClick={() => dispatch(incremented())}>Add One</h2>
      <h2 onClick={() => dispatch(decremented())}>reduce One</h2>
      <h2>{count}</h2>
      <div style={{color: 'blue'}}>{props.date}</div>
      <Link to="/">To Home Clock</Link>
    </>
  )
})

```

# 异步的数据更新视图 中间件 thunk
Redux 存储对异步逻辑一无所知。它只知道如何同步调度动作，通过调用根 reducer 函数更新状态，并通知 UI 发生了一些变化。任何异步都必须在store之外发生。
但是，如果您想通过调度或检查当前存储状态来让异步逻辑与存储交互怎么办？这就是Redux 中间件的用武之地。它们扩展了存储，并允许您：
* 在dispatch任何操作时执行额外的逻辑（例如记录操作和状态）
* 暂停、修改、延迟、替换或暂停已调度的操作
* 编写可以访问dispatch和getState
* 教dispatch如何接受除了普通动作对象之外的其他值，例如函数和promise，通过拦截它们并派发真实的动作对象来代替

Redux Toolkit 的configureStore功能默认自动设置 thunk 中间件

``` bash 
# 修改 reducer counter.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
    incrementByAmount: (state,action) => {
      state.value += action.payload
    }
  }
})
export const { incremented,incrementByAmount, decremented } = counterSlice.actions
#  在这里可以 新增异步操作，根据异步的结果再执行更不更新视图的操作
export const asyncFun = (args)=>{
  return async (dispatch,getState)=>{
    // 这里需要引入axios 触发get的请求
    const data = await axios.get('url')
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter.value}`)
    dispatch(incrementByAmount(args))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter.value}`)
  }
}

export default counterSlice.reducer


# 组件内部调用 方法同其他dispatch保持一致


import { Link } from 'react-router-dom'
import HightClock from '../hightComponents/clock'
import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented,asyncFun } from './../reduces/test'
export default HightClock((props)=>{
  const count = useSelector(state => state.counter.value)
  // const selectCounter = useSelector(state => state.counter.value)
  // console.log(selectCounter)
  const dispatch = useDispatch()
  return (
    <>
      <h1>About</h1>
      <h2 onClick={() => dispatch(incremented())}>Add One</h2>
      <h2 onClick={() => dispatch(decremented())}>reduce One</h2>
      <h2 onClick={() => dispatch(asyncFun(5))}>add Five</h2>
      <h2>{count}</h2>
      <div style={{color: 'blue'}}>{props.date}</div>
      <Link to="/">To Home Clock</Link>
    </>
  )
})
```







