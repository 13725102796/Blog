---
title: Vue v-model的实践
date: 2020-04-13 23:00:42
tags: Vue v-model
---
# Vue v-model的实践
v-model 只是语法糖，主要是通过input事件来触发input标签value值来实现我们说的“双向数据绑定”,其实它还是单向数据流。
``` bash 
<input type="text" v-model="value" />
#等价于
<input type="text" :value="value" @input=v=>$emit('input', v)/>


# 自定义组件实现v-model
<template>
    <input type="text" :value="value" @input="handleInput" :placeholder="placehodler" />
</template>
<script>
  export default {
    name: 'kInput',
    props: {
        value: ['String', 'Number'],
        placeholder: String
    },
    methods: {
        handleInput($event) {
            // 通过input标签的原生事件input将值emit出去，以达到值得改变实现双向绑定
            this.$emit('input', $event.target.value)
        }
    }
  }
</script>


```


