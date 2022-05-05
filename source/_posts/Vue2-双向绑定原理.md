---
title: Vue2 双向绑定原理
date: 2020-07-27 14:19:00
tags: Vue
categories: 
- Vue
---
# 双向绑定的原理介绍
vue的双向绑定是数据和视图的同步变化，即当数据发生变化的时候，相关的视图会发生改变；
视图发生改变的时候，数据也会随之变化。它是通过 数据劫持 结合 发布订阅模式的方式来实现的。

# 实现过程
* 将vue中的data里的所有属性通过实现Observer来完成数据劫持
* Dep是一个容器来存放所有的订阅者Watcher，并解析页面的模板 {{ name }} ，执行相应方法将数据解析到页面上。
* 实现一个监听者Oberver来劫持并监听所有的属性，一旦有属性发生变化就通知订阅者Watcher。
* 订阅者watcher接受来自属性变化的通知(notify)并执行相应的方法，从而更新视图
* 实现一个解析器compile，可以扫描和解析每个节点的相关指令(v-xxx)，通过指令(v-xxx)去对DOM进行封装。当数据发生变化，指令修改对应的DOM，数据驱动DOM的变化。反向，Vue也会监听操作，修改视图时，Vue监听到变化后，改变数据。数据的双向变化形成

# Observer，Dep，Watcher，Compile抽象出数据的双向绑定。
``` bash 
# 定义一个容器类 来存放所有的订阅者
class Dep {
  constructor(){
    this.subs = []
  }
  # 订阅
  addSub(watcher){
    this.subs.push(watcher)
  }
  # 发布
  notify(){
    this.subs.forEach((watcher)=>watcher.update())
  }
}
# 观察者：将数据劫持和页面联系起来
class Watcher{
  constructor(vm,expr,cb){
    this.vm = vm
    this.expr = expr
    this.cb = cb

    this.oldValue = this.get()
  }
  get(){
    Dep.target = this
    //取值，把观察者和数据联系起来
    let value = CompileUtil.getVal(this.vm,this.expr)
    Dep.target = null;
    return value;
  }
  update() {
    //更新操作，数据变化后会调用观察者update方法
    let newVal = CompileUtil.getVal(this.vm, this.expr);
    if (newVal !== this.oldValue) {
      this.cb(newVal);
    }
  }
}

# 将data里的所有属性包括对象里的属性劫持
class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data == "object") {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    //value还是对象的话要继续,才会给全部都赋予get和set方法
    this.observer(value);
    let dep = new Dep(); //给每个属性都加上一个发布订阅功能
    Object.defineProperty(obj, key, {
      get() {
        //创建watcher时候，会取到对应内容，并且把watcher放到全局上
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        //若赋值的是一个对象，还需要继续监控
        if (newVal != value) {
          this.observer(newVal);
          value = newVal;
          dep.notify();
        }
      },
    });
  }
}

# 
class Compiler {
  constructor(el, vm) {
    //判断el属性
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //把当前节点中的元素获取到，并放到内存中
    let fragment = this.node2fragment(this.el);
    //把节点中内容进行替换

    //编译模板，用数据编译
    this.compile(fragment);
    //把内容塞回页面
    this.el.appendChild(fragment);
  }
  //判断是不是指令
  isDirective(attrName) {
    return attrName.startsWith("v-"); //开头
  }
//编译元素的方法
  compileElement(node) {
    let attributes = node.attributes; //类数组
    [...attributes].forEach((attr) => {
      let { name, value: expr } = attr;
      if (this.isDirective(name)) {
        //v-model v-html v-bind
        let [, directive] = name.split("-"); //v-on:click
        let [directiveName, eventName] = directive.split(":");
        //调用不同指令来处理
        CompileUtil[directiveName](node, expr, this.vm, eventName);
      }
    });
  }


```

# 总结
Vue在初始化date数据的时候，通过对data的数据进行劫持，并