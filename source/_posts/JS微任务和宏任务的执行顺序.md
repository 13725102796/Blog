---
title: JS微任务和宏任务的执行顺序
date: 2019-06-14 11:03:11
tags: 微任务 宏任务
---

浏览器是多线程的，JS是单线程的（浏览器只分配一个线程来执行JS）意味着js每次只能执行一个任务，那么，遇到异步任务首先会放到任务队列中（执行栈），先执行主线程中的任务，当主线程中的任务被执行完后，在回过来依次将执行任务队列中任务放入主线程去执行。

js中的任务分为：同步任务和异步任务，而异步任务又可以分为微任务和宏任务

宏任务：macro task
* 定时器(setTimeout,setInterval,setImmediate)
* 事件绑定(onClick)
* ajax
* 回调函数	
* nodejs中的fs I/O操作

微任务: micro task
* Promsie(async/await)
* process.nextTick
* MutationObserver

``` bash 
async function asy1(){
  await console.log('asy1')
}
console.log('script start')
setTimeout(()=>{
  console.log('time out')
},0)
setTimeout(()=>{
  setTimeout(()=>{
    console.log('宏任务中的宏任务')
  },0)
  Promise.resolve().then(()=>{
    console.log('timeOut+promise1')
  })
  console.log('timeOut+promise1之前还是之后')
},0)

asy1()
Promise.resolve().then(()=>{
  console.log('promise1')
}).then(()=>{
  Promise.resolve().then(()=>{
    console.log('promise1+promise1')
  })
  setTimeout(()=>{
    console.log('promise time out')
  },0)
  console.log('promise2')
})

console.log('script end')

# script start
# asy1
# script end
# promise1
# promise2
# promise1+promise1
# time out

```
先执行微任务，执行完所有微任务之后（微任务中产生的微任务也要执行完），再执行宏任务，（宏任务中产生的微任务要优先执行）

