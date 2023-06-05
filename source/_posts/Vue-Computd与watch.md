---
title: Vue Computd与watch
date: 2022-04-24 16:21:34
tags: Vue
categories: 
- Vue
---
# 共同点
computed 和 watch 都是在  beforeCreate - initState(vm) - created 阶段初始化监听的

最终实现原理都是通过 new Watcher 实现 监听的


# 不同点 
watch 支持 watch[key]的值，可以是 包含handle属性的对象, 某个method 名称的字符串，以及存在new old Value 的Function

computed 必须存在return 值。所以不支持异步，如果存在异步，则返回promise


``` bash 

export function initState (vm: Component) {
  ...
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

```


# Computd
``` bash 
# 在vue 实例化后，会判断是否存在computed
# 存在则 遍历computed对象，初始化各个值
function initComputed (vm: Component, computed: Object) {
  const watchers = vm._computedWatchers = Object.create(null)
  const isSSR = isServerRendering()
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    )
    
    // 判断是否与date 数据冲突，没有则开始定义Computed
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}
# 
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
# 在初始化的时候，获取defineComputed创建的watch，去执行一次 计算 evaluate 
# 也就是对应key的方法。存在watcher.value中，return出去
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```
计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算。注意，如果某个依赖 (比如非响应式 property) 在该实例范畴之外，则计算属性是不会被更新的。
computed 就是一个带了缓存的执行函数，只有依赖的数据发生的变化才会重新求值


当计算属性依赖的响应式属性发生修改会做两件事
是将计算属性的watcher 中的dirty属性更新为true ，表示要重新求值
是将渲染函数的watcher 加入任务队列。当渲染函数重新执行的时候就会触发计算属性的getter 并重新计算，这样就达到的缓存计算结果的目的。

# watch
``` bash 
# 和Computed 一样初始化时，遍历 watch ，去挨个createWatcher
function initWatch(vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```
一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用$watch()，遍历 watch 对象的每一个 property。
watch 更像是一个观察者，只要监测到数据变动就会重新执行回调
首先Vue 会根据用户传入的参数类型做格式处理，按处理后的参数调用 $
watch 生成观察器


# watcher 的构造
``` bash 
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }


  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    value = this.getter.call(vm, vm)
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
    
    return value
  }


  update() {
    /* istanbul ignore else */
    console.log('watch update ' + this.id)
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  run() {
    if (this.active) {
      const value = this.get()
      if (value !== this.value || isObject(value) || this.deep) {
        // set new value
        const oldValue = this.value
        this.value = value
        this.cb.call(this.vm, value, oldValue)
        
      }
    }
  }

  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown() {
    # ...移除监听
  }
}
```
# Vue 初始化的时候
vue 在init 阶段会根据传入的options 进行初始化，如果传入的options 中包含有computed , 会执行initComputed
vue 会为每个computed 属性生成一个watcher 实例，并将其中的lazy 属性设置为true (这个状态是用来标识 watcher 做惰性求值， 配合watcher 实例中的dirty 属性来实现)。并调用 createComputedGetter 重写计算属性的getter
``` bash 
function createComputedGetter (key) {
  // 重写计算属性的 getter, 
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      // 初始化的时候会根据 lazy 来初始化dirty属性； 
      // 只有当依赖的响应属性变化，才会重新将计算属性的watcher.dirty 更新为 true
      // 表示在下次重新渲染的时候要重新求值。
      if (watcher.dirty) {
        watcher.evaluate()
      }
      // 当前watcher 中收集了依赖的响应属性的dep
      // 在这个阶段把计算属性依赖的渲染函数的watcher 收集到相同的dep中。
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
// watcher 内定义的方法。  
update () {
    /* istanbul ignore else */
    // 计算属性
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // 其他异步 watcher 加入任务队列等待执行
      queueWatcher(this)
    }
  }
```
重写后的 getter 做了两件事:
* 是判断watcher 的dirty 属性，如果为true表示要重新执行watcher 实例的get 函数（重新求值的函数）
* 将计算属性依赖的渲染函数的 watcher 收集到自己依赖的响应属性的Dep 实例中。经过这样的一个初始化后在响应式数据的 dep 中将收集了两个watcher 一个是计算属性的 watcher , 另一个是计算属性关联的渲染函数的watcher

当计算属性关联的渲染函数的watcher收到来自更新的通知后，就会执行其 update 方法，要求重新求值。判断计算后的值是否相等，不等就通知计算属性的 watcher更新

# 总结
computed 、watch 的底层都是通过生成一个Watcher 对响应数据进行观察，并在需要的时候重新执行求值，他们的不同点主要在于：

* 计算属性的依赖收集并能实现在依赖的数据变化的时候能触发视图的更新，也就要求这个属性必须在组件的 render 函数中有引用到，这样他才能收集渲染函数的watcher 。当在依赖的数据变化后进行重新求值并通知渲染函数重新渲染。
* 虽然watch 要求监听的也是响应式数据，但用户对监听的数据做了修改，用户定义的回调就会被执行。


