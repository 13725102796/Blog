---
title: React16 设计与架构
date: 2022-07-26 11:01:21
tags: React
---

# React 设计理念
由于JS是单线程的，脚本执行与页面渲染无法同时进行。当项目庞大，组件繁多时，JS执行就会超过16.6ms（浏览器单帧时长），用户就会感受到卡顿。
为了解决JS执行事件过长的问题，React 采取了时间切片的方式。将长任务拆分成多个片段到每一帧中执行。

# React16架构可以分为三层：
* Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
  1.时间分片
  每隔一段时间就把主线程还给浏览器，避免长时间占用主线程。当浏览器更新页面之后，继续执行未完成任务
  浏览器每一帧JS执行流程：
  task(宏任务) – 队列中全部job(微任务) – requestAnimationFrame – 浏览器重排/重绘 – requestIdleCallback
  requestIdleCallback 在ie和safair浏览器上会有兼容性问题。
  React团队采用了宏任务中的 MessageChannel 来实现任务中断。
  MessageChannel 可以在页面与内嵌iframe直接通信


* Reconciler（协调器）—— 负责找出变化的组件 (render阶段)
  
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上 (commit阶段)
  

