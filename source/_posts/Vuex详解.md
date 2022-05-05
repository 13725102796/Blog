---
title: Vuex详解
date: 2019-02-25 08:48:42
tags: Vuex
categories: 
- Vue
---
# Vuex 是什么
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

# 安装
`yarn add vuex`

# 使用方法
``` bash
# 创建一个 store，全局数据状态管理中心 store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  action: {
    async handleAsync(state, date){
      # date 是dispatch传递的第二个参数
      # 这里可以操作异步
      # const result = await axios.get(url,params)
      # 然后根据结果触发mutations
      state.commit('increment',date)
    }
  },
  mutations: {
    increment(state,date) {
      state.count = state.count + date
    }
  }
})

# 在入口文件 new Vue 实例化的时候注入进去 index.js
import store from './store'
...
new Vue({
  el: '#app',
  store: store,
})

# 在组件内部调用
...
methods: {
  handleAction(){
    this.$store.state.dispatch('handleAsync',1)
  }
}
```
# 总结
* 创建一个store，里面有action，mutation方法
* 全局注入到Vue的实例
* 通过this.$store.state.dispatch('actionName',params) 触发action
* action方法内部可以执行异步，通过在action 触发state.commit('mutationName',params) 去修改state的值



