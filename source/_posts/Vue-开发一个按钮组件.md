---
title: Vue 开发一个按钮组件
date: 2019-02-13 22:56:17
tags: Vue button
---
# Vue 开发一个按钮组件
解决思路：
通过父子组件通讯（$refs 和 props）
props接受参数, $refs调用子组件的方法
来达到点击提交改变按钮状态，如果不成功则取消按钮状态

``` bash
<template>
<!-- use plane  -->
<!-- 传入bgColor改变按钮背景色 -->
<!-- state切换button的状态 调用cancel()可以切换 -->
<!-- text为按钮文字 -->
  <div class="container">
    <button  
      @click="confirm"
      :disabled="state" 
      class="confirm" 
      :style="{background: btnData.bgColor}"
    >{{text}}</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      text: this.btnData.text,
      state: false,
    }
  },
  props: {
    btnData: {
      types: Array,
      default() {
        return {
          text: '确认',
        }
      }
    }
  },
  methods: {
    confirm(){
      this.text += '...'
      this.state = true
      //这里是激活父组件的事件，因为子组件是不会冒泡到父组件上的，必须手动调用$emit
      //相对应父组件要在调用该组件的时候，将其挂载到上面
      this.$emit("confirm")
    },
    cancel(){
      this.text = this.btnData.text
      this.state = false
    }
  }
}
</script>
<style lang="less" scoped>
.confirm {
  border: none;
  color: #fff;
  width: 100%;
  padding: 1rem 0;
  border-radius: 4px;
  font-size: 1.6rem;
  background: #5da1fd;
  &:focus {
    outline: none;
  }
}
</style>
```

在页面中调用
``` bash 
<template>
    <div class="btn-box">
      <Btn 
        :btnData="{text: '确认注册'}"
        <!--这里就要挂载$emit调用的事件 @confirm="想要调用事件的名字"-->
        @confirm="confirm"
        ref="btn"
      ></Btn>
    </div> 
</template>
<script>
import Btn from '@/components/button'
export default {
  components: {
    Btn
  },
  methods: {
    confirm(){
      if(!this.companyName){
        this.$toast("公司名不能为空")  
        this.$refs.btn.cancel()
      }
  }
}
</script>
```
在这里，要注意一些细节：
* 1. button组件形成之后和其它div元素的间距，如果是在组件内定死是很难复用的。
* 2. 在复用的时候，在父组件中是改变不了子组件的样式的，如果要强制更改，单独写一个并去掉scoped。




