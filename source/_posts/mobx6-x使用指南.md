---
title: mobx6.x使用指南
date: 2021-04-16 09:30:41
tags: mobx
---

# 直接开启动态监听，与视图双向绑定
``` bash 
import {extendObservable} from 'mobx';
import { observer } from 'mobx-react';
import React from 'react'

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      counter: 0,
    })
  }
  onIncrement = () => {
    this.counter++;
  }

  onDecrement = () => {
    this.counter--;
  }
  render() {
    // const { value } = this.props
    // const { authStore } = this.props.store;
    console.log(this.props)
    return (
      <div className="shopping-list">
        <h1> { this.counter}</h1>
        <ul>
          <li onClick={this.onIncrement} >onIncrement</li>
          <li onClick={this.onDecrement}>onDecrement</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
export default observer(ShoppingList)
```

# 注意要点
* 安装 mobx mobx-react
* 初始化需要监听的数据,
``` bash 
constructor(props) {
  super(props);
  extendObservable(this, {
    counter: 0,
  })
}
```
* export 的时候 observer(ShoppingList) 一下

这是实现了组件内的双向绑定类似于 data(){return{...obj}} v-model 

```



