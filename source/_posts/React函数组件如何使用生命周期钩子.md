---
title: React函数组件如何使用生命周期钩子
date: 2020-08-21 21:28:16
tags: useEffect useState Hook
---

# useEffect Hook useState Hook
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

``` bash
function Counter(){

  const [counter,setCounter] = useState(0)
  # 这句话等同于 class Components 的
  # state = {
  #   counter: 0
  # }
  # 可以在函数内使用多次，用法和state一样，不一定是值，可以是对象，like：
  # const [counter1,setCounter1] = useState({id:1,value: 2})
  # 通过setCounter设置counter的值
  
  useEffect(()=>{
    # 这里处理的是 componentDidMount 和 componentDidUpdate
    setCounter(counter+1)
    return ()=>{
      # 这里处理的是componentWillUnmount


    }
  })
  # useEffect也可以设定多个，他还有第二个参数，用于设置他是否在更新的时候执行
  # useEffect(()=>{
  #   setCounter(counter+1)
  # },[counter])
  # 这里监听了counter，只有counter发生改变才会执行
  # useEffect(()=>{
  #   setCounter(counter+1)
  # },[])
  # 是空数组的话，就可以在更新的时候不执行，只会在第一次加载的时候执行

}

```
# 自定义Hook 
首先 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。
类似于将多个组件共同的功能抽离出来，统一封装使用
要点：
* 自定义 Hook 必须以 “use” 开头，因为要判断某个函数是否包含对其内部 Hook 的调用，React 将需要自动检查你的 Hook 是否违反了 Hook 的规则。
* 在两个组件中使用相同的 Hook 不会共享 state。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

由于使用相同的 Hook 不会共享 state，大多数情况还是需要依赖redux等辅助工具来统一状态管理。
