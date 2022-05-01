---
title: react组件件的代码复用，以及为何弃用mixins的思考
date: 2020-07-17 08:49:37
tags: mixins react
---
# 为何弃用mixins，故事背景
“我如何在几个组件之间共享代码？” 是人们在学习 React 时首先提出的问题之一。我们的答案一直是使用组件组合来进行代码重用。您可以定义一个组件并在其他几个组件中使用它。
如何通过组合来解决某种模式并不总是很明显。React 受到函数式编程的影响，但它进入了由面向对象库主导的领域。
mixin 系统就是其中之一，它的目标是当你不确定如何用组合解决同样的问题时，它的目标是为你提供一种在组件之间重用代码的方法。
随着组件数量越来越多，使用 React 的一些代码逐渐变得难以理解。
这些组件太容易被意外破坏，让新开发人员感到困惑，最终也让最初编写它们的人感到困惑。这种混乱大部分是由 mixins 引起的。

Mixins 打破了常见且通常安全的假设，即您可以通过在组件文件中搜索其出现来重命名状态键或方法。您可能会编写一个有状态的组件，然后您的同事可能会添加一个读取此状态的 mixin。几个月后，您可能希望将该状态移至父组件，以便与兄弟姐妹共享。你会记得更新 mixin 来读取道具吗？如果现在其他组件也使用这个 mixin 怎么办？

有时候可能要修改mixin的部分功能，但是不知道在哪个地方哪个角落调用了这个方法。你不得不复制一份出来单独维护。
这就是mixin为何被弃用的主要原因。
当数量上来了，复用的功效就没那么明显，还可能是一种累赘。

每一个新的需求都会让 mixins 更难理解。随着时间的推移，使用相同 mixin 的组件变得越来越耦合。任何新功能都会被添加到使用该 mixin 的所有组件中。如果不复制代码或在 mixin 之间引入更多的依赖关系和间接性，就无法拆分 mixin 的“更简单”部分。逐渐地，封装边界被侵蚀，并且由于很难更改或删除现有的 mixin，它们变得越来越抽象，直到没有人了解它们是如何工作的。

# 解决方案 之 高阶组件
高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式

具体而言，高阶组件是参数为组件，返回值为新组件的函数。

目的是为了数据与视图分离，所有操作数据的方法都封装在高阶组件的函数内部，视图的展示，通过传递的组件参数去表达
``` bash
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```
HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用

# HOC 约定：将不相关的 props 传递给被包裹的组件
HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。
HOC 应该透传与自身无关的 props。大多数 HOC 都应该包含一个类似于下面的 render 方法：
``` bash
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}

```

# HOC约定：最大化可组合性
并不是所有的 HOC 都一样。有时候它仅接受一个参数，也就是被包裹的组件：
const NavbarWithRouter = withRouter(Navbar);

HOC 通常可以接收多个参数。比如在 Relay 中，HOC 额外接收了一个配置对象用于指定组件的数据依赖：
const CommentWithRelay = Relay.createContainer(Comment, config);

甚至可能是返回高阶组件的高阶函数！！！
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

类似于函数柯里化
把函数的参数
``` bash
let createCurry = (fn,...params)=>{
  let args = params || []
  let fnLen = fn.length
  return (...res)=>{
    let allArgs = args.slice(0)
    allArgs.push(...res)
    if(allArgs.length < fnLen>){
      return createCurry.call(this,fn,...allArgs);
    } else {
      return fn.apply(this,allArgs);
    }
  }
}
```
# 注意事项
* 不要在 render 方法中使用 HOC
React 的 diff 算法使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树。
``` bash
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}

```
在每次render时都会重新创建，重新挂载组件会导致该组件及其所有子组件的状态丢失。
如果在组件之外创建 HOC，这样一来组件只会创建一次。因此，每次 render 时都会是同一个组件。
在极少数情况下，你需要动态调用 HOC。你可以在组件的生命周期方法或其构造函数中进行调用。
* 务必复制静态方法
``` bash 
// 定义静态函数
WrappedComponent.staticMethod = function() {/*...*/}
// 现在使用 HOC
const EnhancedComponent = enhance(WrappedComponent);

// 增强组件没有 staticMethod
typeof EnhancedComponent.staticMethod === 'undefined' // true

# 传入组件的静态方法会随着被高阶组件聚合而丢失
# 可以通过在高阶组件内部复制一份
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // 必须准确知道应该拷贝哪些方法 :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
# 借用第三方库，无感拷贝 hoist-non-react-statics 自动拷贝所有非 React 静态方法:

import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}

  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}

```

* Refs 不会被传递
那是因为 ref 实际上并不是一个 prop，它就像 key 一样，是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。








