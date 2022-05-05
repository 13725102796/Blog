---
title: React组件通讯
date: 2021-09-22 11:49:28
tags: 组件通讯
categories: 
- React
---

# 父子组件通讯
通过props，父组件向子组件传递值或者方法，子组件向父组件通讯，子组件可以调用父组件通过props传递的方法
# 全局context 
1. 通过createContext创建一个上下文 const Context = React.createContext({color: red})
2. 通过 当前节点的state复制一份Context的值
3. 当前节点用<Context.Provider value={this.state}>包裹
4. 在该节点下的某个组件使用，可以通过 <Context.Consumer>{(value)=>{}}</Context.Consumer> 组件下接收传递的value
    也可以给类组件 MyClass.contextType = MyContext;直接赋值，在组件内部通过this.context访问

# 想要在子组件修改该context的值，需要将修改的方法一并传入进去
在复制context的值给节点的state的时候，需要额外定义一个修改该值的方法
this.handleFontSize = () => {
  this.setState(state => ({
    fontSize: state.fontSize === fontSize.small
        ? fontSize.big
        : fontSize.small,
  }));
}
// State 也包含了更新函数，因此它会被传递进 context provider。
this.state = {
  fontSize: fontSize.small,
  handleFontSize: this.handleFontSize,
};

在子组件通过 this.context.handleFontSize()去修改即可


# 全局通讯之 redux toolkit
``` bash 
# 1. 先创建一个 Slice 通过 createSlice
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const testApi = '/public/page/getHomePageModules'
export const fetchThunks = createAsyncThunk('thunks/fetchThunks', async () => {
  const response = await axios.get(testApi,{})
  return response.data
})

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    state: 'idle',
    error: null
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
  },
  extraReducers(builder){
    builder.addCase(fetchThunks.fulfilled,(state,action)=>{

    })
  }
})
export const { incremented,incrementByAmount, decremented } = counterSlice.actions
export const asyncFun = (args)=>{
  return async (dispatch,getState)=>{
    const data = await axios.get(testApi,{})
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter.value}`)
    dispatch(incrementByAmount(args))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter.value}`)
  }
}

export default counterSlice.reducer


# redux 是不支持异步操作，所以需要支持异步的中间件来完成，如Thunk
# createAsyncThunk('type名称',asyncFn) 对应dispath({type:'actionname',payload:''})
# asyncFn的返回值就是payload

# 创建完后就关联到store集合里面，通过 configureStore
import counterSlice from "./test"
import { configureStore } from '@reduxjs/toolkit'
import thunksSlice from "./thunks"
const store = configureStore({
  reducer:{
    counter: counterSlice,
    thunks: thunksSlice
  } 
})

export default store
```


 

