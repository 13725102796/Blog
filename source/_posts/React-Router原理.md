---
title: React Router源码解析
date: 2022-05-20 09:46:21
tags: 
categories: 
- React
---

# BrowserRouter
BrowserRouter 一般是作为 App 的 container
``` bash 
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
)

# 我们从BrowserRouter 入口开始,看看其做了哪些初始化工作：
export function BrowserRouter({
  basename,
  children,
  window
}: BrowserRouterProps) {
  const historyRef = React.useRef<BrowserHistory>();
  if (historyRef.current == null) {
    // 如果为空，则创建
    // createBrowserHistory 是一个基于当前window构造的一个history 的构造函数
    // history 拥有两个可读的属性 action location，以及路由跳转，路由监听的一些方法
    historyRef.current = createBrowserHistory({ window });
  }

  const history = historyRef.current;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => {
    /**
     * popstate、push、replace时如果没有blokcers的话，会调用applyTx(nextAction)触发这里的setState
     * function applyTx(nextAction: Action) {
     *   action = nextAction;
     * //  获取当前index和location
     *   [index, location] = getIndexAndLocation();
     *   listeners.call({ action, location });
     * }
     */
    history.listen(setState)
  }, [history]);
  // 一般变化的就是action和location
  return (
    <Router
      basename={basename}
      children={children}
      action={state.action}
      location={state.location}
      navigator={history}
    />
  );
}
```

# createHashHistory 与 createBrowserHistory 的不同点
createBrowserHistory 是直接获取 window.location，而 createHashHistory 是 parsePath(window.location.hash.substr(1))
即 url 中有多个#，但是会取第一个#后面的来解析对应的 pathname、search 和 hash
createHashHistory 多了监听 hashchange的事件
createHref 会在前面拼接 getBaseHref() + '#'

# 结语
* 通过 push、replace 和 go 可以切换路由
* 可以通过 history.listen 添加路由监听器 listener，每当路由切换可以收到最新的 action 和 location，从而做出不同的判断
* 可以通过 history.block 添加阻塞器 blocker，会阻塞 push、replace 和浏览器的前进后退。
* 且只要判断有 blockers，那么同时会加上beforeunload阻止浏览器刷新、关闭等默认行为，即弹窗提示。
* 且只要有 blocker，那么上面的 listener 就监听不到



