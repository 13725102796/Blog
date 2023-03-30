---
title: react17.x 主流程解析
date: 2023-03-29 09:35:36
tags: React
---

# 关于 React 三大架构

* reconciler 协调器 ，集成filber
* Scheduler 任务调度器
* react-dom 渲染器


# reconciler
reconciler 主要是负责 scheduler 与 react-dom 的任务之间的互相协调与分配。

内置一个任务循环，将同步的任务放入循环，按顺序执行。异步的任务，直接执行。

通过fiber 构建fiber树。输出给react-dom去生成dom树给浏览器渲染。

内置一个 scheduleUpdateOnFiber （更新fiber树）的方法，该方法主要将 更新fiber树 的操作封装成 scheduler 接收的 task 任务包。然后放进任务调度循环里面，根据优先级 ，等待 reconciler 提取task来执行 task的回调 来构建fiber树。

# scheduler

scheduler 存放任务包 用的是 二叉堆 中的最小堆数据模型。优先级最高的就会出现在最顶点，等待被取用。

优先级使用的是 lanes 模型。二进制变量。 利用了位掩码的特性, 在频繁运算的时候占用内存少, 计算速度快.

主要提供了4个调度的核心的函数
* requestHostCallback
* cancelHostCallback
* requestHostTimeout
* cancelHostTimeout


通过 消息通道 MessageChannel 来通知执行callback

``` bash 
// 接收 MessageChannel 消息
const performWorkUntilDeadline = () => {
  // ...省略无关代码
  if (scheduledHostCallback !== null) {
    // 执行callback
    scheduledHostCallback(hasTimeRemaining, currentTime);
  } else {
    isMessageLoopRunning = false;
  }
};
const channel = new MessageChannel()
const port = channel.port2
channel.port1.onmessage = performWorkUntilDeadline;

// 请求回调
requestHostCallback = function(callback) {
  // 1. 保存callback
  scheduledHostCallback = callback;
  // 判断事件循环是否处于工作中，不是就开启
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    // 2. 通过 MessageChannel 发送消息
    port.postMessage(null);
  }
};
// 取消回调 就是移除回调
cancelHostCallback = function() {
  scheduledHostCallback = null;
};
```

时间切片(time slicing)相关: 执行时间分割, 让出主线程(把控制权归还浏览器, 浏览器可以处理用户输入, UI 绘制等紧急任务).

* getCurrentTime: 获取当前时间
* shouldYieldToHost: 是否让出主线程
* requestPaint: 请求绘制
* forceFrameRate: 强制设置 yieldInterval(从源码中的引用来看, 算一个保留函数, 其他地方没有用到)

# Fiber
fiber树构造 
* 从scheduler调度中心的角度来看, 它是任务队列taskQueue中的一个具体的任务回调(task.callback).
* 从React 工作循环的角度来看, 它属于fiber树构造循环.

通过 函数编程 return 出来的是一段类似html的jsx语法片段，经过编译器转换, 最终会以React.createElement(...)的方式，创建出来一个与之对应的ReactElement对象。

经过scheduler包，封装成task，放入二叉堆，按照任务优先级，等待任务回调

执行任务回调， 通过 ReactElement对象 里面的属性 进行创建多个fiber对象， 这些fiber构成了一棵fiber树, fiber树是构造DOM树的数据模型。


开发人员通过编程只能控制ReactElement树的结构, ReactElement树驱动fiber树, fiber树再驱动DOM树, 最后展现到页面上. 所以fiber树的构造过程, 实际上就是ReactElement对象到fiber对象的转换过程.

双缓冲技术(double buffering)
fiber树的构造过程, 就是把ReactElement转换成fiber树的过程. 
在这个过程中, 内存里会同时存在 2 棵fiber树: fiberRoot && HostRootFiber

* 代表当前界面的fiber树(已经被展示出来, 挂载到fiberRoot.current上). 如果是初次构造(初始化渲染), 页面还没有渲染, 此时界面对应的 fiber 树为空(fiberRoot.current = null).
* 正在构造的fiber树(即将展示出来, 挂载到HostRootFiber.alternate上, 正在构造的节点称为workInProgress). 当构造完成之后, 重新渲染页面, 最后切换fiberRoot.current = workInProgress, 使得fiberRoot.current重新指向代表当前界面的fiber树.


  












