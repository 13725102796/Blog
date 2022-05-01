---
title: Redux-saga 详解
date: 2022-04-24 11:20:36
tags: Redux-saga
---

# 在与redux-toolkit 一起使用的 基础配置
``` bash 
# 新建一个saga.js
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
const testApi = '/public/page/getHomePageModules'

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* fetchUser(action){
  try {
    const user = yield call(axios.get(testApi),action.payload.userId)
    console.log(user)
    yield put ({type:"USER_FETCH_SUCCEEDED",user:user})
  } catch (e){
    yield put({type: "USER_FETCH_FAILED",message:e.message})
  }
}
/*
  在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
function* mySaga(){
  yield takeEvery("USER_FETCH_REQUESTED",fetchUser)
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/

export default mySaga;

# 集中到store里面的写法
import counterSlice from "./test"
import { configureStore } from '@reduxjs/toolkit'
import thunksSlice from "./thunks"
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer:{
    counter: counterSlice,
    thunks: thunksSlice,
    
  },
  middleware: defaultMiddleware => defaultMiddleware().concat(sagaMiddleware)
 
})
sagaMiddleware.run(mySaga)
export default store

# 使用与其他的一致，通过dispatch
import HightClock from '../hightComponents/clock'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default HightClock((props)=>{
  const count = useSelector(state=>state.counter.value)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {}})
  },[])
  // 
  return (
    <>
      <h1>Home Child1</h1>
      <h2>counterValue: {count}</h2>
      <div>{props.date}</div>
      {/* <Link to="/about">To About Clock</Link> */}
    </>
)})
```
