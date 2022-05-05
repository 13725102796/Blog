---
title: Vue 设置深度属性
date: 2019-08-24 15:43:02
tags: $set
categories: 
- Vue
---

# $set的使用原理
``` bash
function set(target,key,val){
  # 先进行一个判断，判断target不是undefined、null、string、number、symbol、boolean类型。
  # 是的话就抛出异常
  if(isUndef(target) || isPrimitive(target)) {
    warn(...)
  }
  # 如果target是一个数组，那么根据key值及数组长度更改数组的长度(取其中较大者)，然后直接使用splice函数修改数组，虽然vue没有监听数组变化，但是监听了数组的push,pop,shift,unshift,splice,sort,reverse函数，所以使用splice也可以达到更新dom的目的
  if(Array.isArray(target) && isValidArrayIndex(key)){
    target.length = Math.max(target.length,key)
    target.splice(key,1,val)
  }
  # 如果target是一个对象，且key是对象已存在的私有属性，那么直接赋值就可以了，因为这个key必然是被监听过的
  if(key in target && !(key in Object.prototype)){
    target[key] = val
    return val
  }
  # 如果这个key目前没有存在于对象中，那么会进行赋值并监听。这里省略了ob的判断，那么ob是什么呢，vue中初始化的数据(比如data中的数据)在页面初始化的时候都会被监听，而被监听的属性都会被绑定__ob__属性，这里就是判断这个数据有没有被监听的。如果这个数据没有被监听，那么就默认你不想监听这个数据，所以直接赋值并返回
  var ob = (target)._ob_
  if(target._isVue || (ob && ob.vmCount)){
    ...
    return val
  }
  if(!ob){
    target[key] = val
    return val
  }
  defineReactive(ob.value,key,val)
  ob.dep.notify()
  return val




}
# 已经定义的对象属性会在初始化的时候监听
data(){
  return {
    visit: {
      name: 'already'
    }
  }
}
# 通过handleVal添加的属性是没有被监听的
methods: {
  handleVal(){
    this.visit.addVal = 'noVisit'
  }
}
# 除非在把data修改为
data(){
  return {
    visit: {
      name: 'already'，
      addVal: null,
    }
  }
}
# 又或者通$set设置
methods: {
  handleVal(){
    this.$set('visit','addVal','noVisit')
  }
}
```



