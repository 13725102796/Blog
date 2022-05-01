---
title: Vue 组件通讯的方法
date: 2021-03-13 23:29:45
tags: Vue 组件通讯
---

# Vue 组件通讯的方法
* props和$emit
* $on/$emit
* $parent/$childen & ref
* Vuex

## props和$emit
``` bash 
<template>
  <div class="home">
    <div>我是父组件</div>
    <Child :msg="msg" v-on:changed="changed"/>
  </div>
</template>

<script>
import Child from '@/components/Child.vue'

export default {
  name: 'home',
  components: {
    Child
  },
  data() {
    return {
      msg: 'child'
    }
  },
  methods: {
    changed(e) {
      this.msg = e;
    }
  }
}
</script>

# ------- child component-------------
<template>
    <div>
        <p @click="change">
          我是子组件:传递来的消息是：{{msg}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    change() {
      this.$emit('changed','向父组件传值')
    }
  } 
}
</script>

```

## $on/$emit 
通过一个空的vue实例作为中央事件总线，用它来触发和监听事件，跨级组件之间的通讯
``` bash 
# ------  bus --------------
import Vue from 'vue'
var Event = new Vue()
export function sendSDKLoadend () {
  Event.$emit('loadendSDK', true);
}
export function monitorSDKLoadend(callback) {
  Event.$on('loadendSDK', callback)
}
# 当某个页面触发了sendSDKLoadend()时，绑定了monitorSDKLoadend(fn) 的地方，fn会执行
```

## $parent/$childen，访问父/子实例 和 ref获取组件实例
``` bash
# 在组件上绑定 ref
<Child ref="child" />
# 通过 this.$refs.child 获取子组件的实例
this.$refs.child

# 子组件通过 $parent 获取父组件的实例
this.$parent
```

## Vuex 
通过 this.$store.dispatch('actionName',params) 触发Action去通知Mutation更新State的值。所有引用改State的值的组件都会更新











