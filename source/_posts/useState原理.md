---
title: useState原理
date: 2021-06-25 21:35:06
tags: useState
---

# state是异步的
在控制台中，我们可以看到，打印的num并不是页面上显示的结果，这是因为react中state的更新是异步的。当我们setState后，react并不会立即将值做出改变，而是将其暂时放入pedding队列中。react会合并多个state，然后只render 一次。

# state改变却没有重新初始化
页面在首次渲染时会 render 渲染 <App /> 函数组件，其实际上是调用 App() 方法，得到虚拟 DOM 元素，并将其渲染到浏览器页面上。当用户点击 button 按钮时会调用 setN(n+1) 方法，然后再进行一次 render 渲染 <App /> 函数组件，其实际上还是调用了 App() 方法，得到一个新的虚拟 DOM 元素，然后 React 会执行 DOM diff 算法，将改变的部分更新到浏览器的页面上。

页面首次渲染和进行 +1 操作，都会调用 App() 函数去执行 const [n, setN] = React.useState(0); 这行代码，那它是怎么做到在 +1 操作后，第二次渲染时执行同样的代码，却不对变量 n 进行初始化的，而是拿到 n 的最新值的呢 


let _state; // 把 state 存储在外面
 
function useState(initialValue) {
  _state = _state || initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;    //实际修改的是_state，重新渲染也会去拿_state
    render();
  }
  return [_state, setState];
}

# 这种使用 useState的方式在 React 中是不被允许 useEffect同理
if (n % 2 === 1) {    的
    [m, setM] = React.useState(0);
}
应对多个变量的问题，React 引用了数组对其进行解决，但是这中改进方式有一个缺点，由于数组不像对象，有对应的键，数组只能依靠顺序找到对应的变量，所以在 React 中不允许将 useState() hook 放到 if 判断语句中，这样就会导致变量在数组中的顺序混乱

# 总结 
useState是通过将变量抽离到函数体外形成闭包，在函数体内部判断而形成的缓存
因为允许组件多次调用的问题，useState只接受一个参数，所以采用数组的方式进行缓存。
不能在顶层做条件执行就是怕数组乱序



