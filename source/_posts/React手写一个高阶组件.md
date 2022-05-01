---
title: React手写一个高阶组件
date: 2020-08-17 16:04:50
tags:  React HOC 
---

# 高级组件是为了让数据和视图分离，这里以Clock为例
``` bash
# 获取当前运动的时间点
class Clock extends React.Components {
  constructor(){
    super()
    this.state = {
      date: new Date().toLocaleTimeString()
    }
  }
  componentDidMount(){
    this.timerId = setInterval(()=>{
      this.tick()
    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.timerId)
  }
  tick(){
    this.setState({
      date: new Date().toLocaleTimeString()
    })
  }
  render(){
    return (
      <div>
        <h1>This is Clock</h1>
        <h2>{this.state.date}</h2>
      </div>
    )
  }
}
```

上面一个普通的时钟组件就写好了，但是我想要很多个不同外观的时钟。
这个时候我不可能去一个个的复制这个Clock-》Clock1-》Clock2... 然后去修改里面的render里面html的外观。

首先要明确一点，这里的获取和生成数据的逻辑都是一样的，是可以复用
这时候，就可以使用高阶组件去包装，把数据操作层和UI层分离出来
通过向高阶组件传递UI的组件去复用数据的逻辑

实现代码如下： 
``` bash 
import React from 'react'
function HightClock(UIComponents){
  return class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        date: new Date().toLocaleTimeString()
      }
    }
    componentDidMount(){
      this.timerId = setInterval(()=>{
        this.tick()
      },1000)
    }
    componentWillUnmount(){
      clearInterval(this.timerId)
    }
    tick(){
      this.setState({
        date: new Date().toLocaleTimeString()
      })
    }
    render(){
      return (
        <UIComponents date={this.state.date} {...this.props} />
      )
    }
  }
}
function Clock1 (props){
  return (
    <div>
      <h1>Clock1</h1>
      <h2>{props.date}</h2>
    </div>
  )
}
function Clock2 (props){
  return (
    <div style={{color: 'red'}} >
      <h1>Clock2</h1>
      <h2>{props.date}</h2>
    </div>
  )
}
const Clock1Componetns = HightClock(Clock1)
const Clock2Componetns = HightClock(Clock12)
function Clock (){
  return (
    <div>
      <Clock1Componetns />
      <Clock2Componetns />
    </div>
  )
}

export default Clock

```
