---
title: React fiber原理解析
date: 2022-05-20 10:55:12
tags: filber
categories: 
- React
---
# Fiber 起源
Fiber架构诞生于React16，是为了解决React15及之前版本的更新不可中断问题的。

# 堆栈协调Stack Reconciler
在React15的时候，React采用的还是堆栈协调Stack Reconciler，之所以把它成为堆栈协调，是因为React是使用递归来构建虚拟Dom树(React 15的叫法)的，构建过程中，数据被保存在递归调用栈中。由于递归是同步执行的，所以它一旦执行就只能执行完，不能被中途打断。这导致浏览器在执行代码时，Stack Reconciler 经常由于需要协调非常多的节点而耗费大量时间，而浏览器的UI渲染工作迟迟得不到执行

# Fiber协调器 Fiber Reconciler
在React16发布时推出了全新的Fiber架构，旨在解决老版本的更新不可中断问题。
一个大的同步任务可以分成许多小的同步任务，在浏览器运作的时候，平均的把这些小的同步任务塞到每一帧的一小块时间里执行，这种做法我们称为可中断的异步更新。

# Fiber工作流程
双缓存机制
我们在图像处理的时候，往往会经历渲染画面-清除画面-重新渲染画面这个过程，往往清除画面后进行重绘的时候，可能会比较耗时，这时候用户就会感知到闪屏的现象。如果我们在内存中进行当前帧画面的构建，构建完毕后直接替换之前的画面，省去清屏的步骤，这样就节省了很多时间，很大程度上改善了用户体验。

所以在React中，我们也使用了双缓存机制，即系统中始终存在着两棵Fiber树，一棵对应的是当前DOM在屏幕上显示的画面，被称作current，此时我们称其为当前组件树，一棵是在内存中进行构建的新的Fiber树，被称作workInProgress，此时我们称其为正在构建中的组件树

``` bash 
function App() {
  const [num , setNum] = useState(0);
  return (
        <p onClick={()=>setNum(num + 1)}>
           {num}
        </p>
  );
}



```
# Fiber 初始化首屏渲染
一开始Fiber会构建 一个FiberRootNode和RootFiber，FiberRootNode的current指针指向rootFiber，此时rootFiber是为空的。

然后根据组件树返回的jsx对象，在render阶段创建新的rootFiber

这一步是递归的创建workInProgress，创建完workInProgress后，然后在commit阶段把这棵树渲染到页面上，此时修改current指针指向workInProgress，使其成为新的current树
current和workInProgress通过alternate互相连接

# Fiber树更新
在我们点击p使得页面触发更新后，React会在内存中重新构建一棵完整的Fiber树，也就是workInProgress
在构建完成后会直接让current指针指向它，然后render阶段就会基于这个新的current进行渲染。
在此过程中我们可以使用Diff算法决定是否复用current树中的节点，省去创建节点的流程，进一步加快渲染过程

# 节点复用
在页面更新时，由于React的双缓存机制，在渲染页面的时候，会先从内存中构建一棵Fiber树，等构建完毕后，直接改变current指针的指向替换掉当前的Fiber树，达到页面更新的目的。
如果重新的从无到有渲染一棵完整的Fiber树，是很耗时的，所以我们可以基于 current 树来复用一些节点创建workInProgress树.
我们会使用Diff算法来决定是否复用节点，要复用的节点就是current.alternate。

# Fiber 调度机制
Fiber将一个DOM更新任务拆分为由多个原子化可调度的节点组成的集合，从而提供了细粒度的任务调度能力。
Fiber架构由2部分组成：分发器（dispatcher）和调度器（scheduler）。

当点击p，触发点击事件，将事件会触发分发器的转换动作。可以先简单的认为分发器将触发1个FiberNode的更新： p文本由0变为1。

Task
分发器与调度器之间通过Task进行通信。Task对应的是组件的挂载或更新动作。由FiberRoot和FiberTree构成。
FiberTree是由一个一个FiberNode以单链表的形式组合成的节点集合。
FiberNode是调度器执行的最小单位，每执行完一个FiberNode更新后，线程的控制权将转交给调度器，由调度器来选择下一个执行的任务（继续或中断插入其他任务）。

Task调度过程
组件的初始化挂载或事件驱动更新都会触发一个任务的启动。

Task 挂起
开始执行过程。在执行每个节点单元的时候会先判断浏览器是否有空余时间执行下一个工作单元。当不满足向下执行条件时（比如有其他高优先级的任务插入，或则当前时间片已用完），任务中断，被挂起。

Task 任务恢复
任务执行过程中，每一个FiberNode的执行结果都会标记在属性上。调度模块重新执行挂起任务时，本质上是重新执行该更新任务，在具体更新每一FiberNode的时候会根据节点上的缓存属性判断该节点是否（props参数前后比对）需要重新计算更新数据，需要则逻辑不变，不需要则跳过。

Task 任务结束
当整个FiberTree中的节点都被处理后，统一提交所有FiberNode更新。并将更新结果统一反应到界面上，到此任务结束，任务将会被注销，同时回收FiberRoot保存的上下文。


# commit阶段
commit阶段的主要职责就是将render阶段创建的fiber树渲染到页面中，也就是要执行具体的dom操作。
* 渲染前(before mutation)
* 渲染(mutation)
* 渲染后(layout)
各阶段执行函数
before mutation阶段：commitBeforeMutationEffects
mutation阶段：commitMutationEffects
layout阶段 commitLayoutEffects

# 总结
* Fiber 调度机制
Fiber 主要是可以在React更新节点的时候挂起更新，以往的由递归更新同步执行。
现在是由调度器在执行完每一个Task下的FiberNode（调度器执行的最小单元），将执行权返回调度器，由调度器决定 继续执行还是挂起等待。
当任务和FiberNode非常大的时候，也会存在性能瓶颈。

* Fiber 工作流程
Fiber 是双缓存机制。在首屏初始化的时候 会创建一个 FiberRootNode 和 FiberRoot，
FiberRootNode.current 指向 FiberRoot。
在构建返回的jsx时，会额外创建一个工作中的FiberRoot，FiberRoot下面的节点与dom一致。
在构建时，会根据diff算法进行比对是否可以复用节点；
构建完成后，将FiberRootNode.current 指向该工作中的FiberRoot。

最后提交到Commit交给浏览器渲染


# Fiber的主要目标是利用React的Scheduling的优势
当前React并没有充分利用Scheduling的优势，一次更新会导致立刻重新渲染整个子树。
Fiber背后的思想就是彻底革新整个核心算法以充分利用Scheduling的优势。
它可以做到： 
* 暂停工作，并回来
* 为不同类型任务分配优先级
* 重用以前完成的工作
* 不需要的时候终止任务
为了做到这一点，我们需要一种将工作分解成多个单元的方法。从某种意义上来说，这就是Fiber。Fiber是一个最小工作单元

# 计算机工作原理
计算机通常使用调用堆栈来跟踪程序执行的方式，一个函数被调用的时候，一个新的stack frame被添加到堆栈中，这个stack frame也代表了这个函数的工作也被执行了

# Fiber是堆栈的重新实现，也可以将其视为虚拟堆栈 。
重新实现堆栈的优势在于，你可以将堆栈保存在内存中，并根据需要（以及任何时候）执行他们，这对于我们的目标来说至关重要。
除了任务调度之外，手动处理堆栈还可以释放并发和错误边界等功能。