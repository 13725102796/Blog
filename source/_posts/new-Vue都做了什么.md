---
title: new Vue都做了什么
date: 2020-07-29 09:06:43
tags: Vue
---
# new Vue初始化流程
``` bash
new Vue({
  el:'#app',
})
# src/core/instance/index.js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // new Vue的时候就执行到了这个_init函数
  this._init(options)
}
initMixin(Vue) // 其他的不看，先看这个函数
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue


# _init 主要做了什么
initLifecycle(vm)
initEvents(vm) $on 、$emit :like @click
initRender(vm) 用于初始化$slots 、$attrs 、$listeners
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

# mount阶段做了什么
/**
* 编译权重：
* 优先看有没有render函数，如果有直接用
* 如果没有render函数就看有没有template模板
* 如果都没有就直接获取el的outerHTML作为渲染模板
*/
if (!options.render) {
    if (!options.template) {
        template = el.outerHTML
    } else {
        template = vm.$options.template
    }
}
if (template) {
    //用 template 生成 render 函数
    let render = compileToFunctions(template)
    options.render = render
}
//调用 mount 方法开始渲染页面。
return mount(this, el)

export function mountComponent(vm, el) {
	//渲染之前调用 beforeMount 生命周期
    callHook(vm, 'beforeMount')
    //创建一个更新渲染函数 （ 用来得到 Vnode 渲染真实 dom ）
    let updateComponent = () => {
        vm.update(vm._render())
    }
    //生成一个渲染 watcher 每次页面依赖的数据更新后会调用 updateComponent 进行渲染
    new Watcher(vm, updateComponent, () => {},{
        before () {
            callHook(vm, 'beforeUpdate')
        }
      },true)
    //渲染真实 dom 结束后调用 mounted 生命周期
    callHook(vm, 'mounted')
}
# 创建了一个更新的渲染函数update，以及一个Watcher
export class Watcher {
    constructor(vm,expOrFn,cb,options) {
        if (typeof expOrFn === 'function') {
        	// 保留 updateComponent 方法
            this.getters = expOrFn
        }
        this.get();
    }
    get() {
        pushTarget(this)
        let value
        // 这里调用了 updateComponent 方法
        value = this.getters.call(this.vm, this.vm);
        popTarget()
        return value
    }
}
# watcher 主要监听 页面数据的变动，变动后调用updateComponent去更新视图

# 而update则基于diff算法去对比节点，与上一次的节点进行对比，diff主要基于递归和双指针去对比。然后patch到真实的节点上去更新视图


```

# 总结
1. new Vue()主要做了 创建一个空对象，把Vue构造函数的原型指向该对象，通过apply继承的方式去执行该构造函数，并返回该执行结果
2. 执行该构造函数的过程，主要是Vue初始化的过程
  * 初始化生命周期 initLifecycle 
  * 初始化事件以及特殊操作符 $on,$attr...
  * 执行beforeCreat钩子函数
  * 依赖注入，初始化state，注入provider（props）
  * 执行Created
    
 