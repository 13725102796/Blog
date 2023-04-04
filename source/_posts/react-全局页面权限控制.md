---
title: react 全局页面权限控制
date: 2023-04-03 11:12:28
tags: React Premiss
---

# 基于最新版本的 react-router-dom V6 版
主要依赖方法：
* useMatches
* useOutlet
* Navigate
* Outlet


``` bash
### useMatches 判断路由地址白名单是否完全匹配
### Outlet 匹配规则路由，放行操作
### Navigate 不匹配则打到登录页或者无权限访问页

const whiteList = [
  "/",
  "/index",
];
function AuthRoute() {
  const matches = useMatches();
  console.log(matches);
  const outlet = useOutlet();
  const isLogined = false;
  // 从user-redux读取用户信息，判断是否登录
  const user = useSelector((state: RootState) => state.user.userMsg);
  // 根据白名单的登录状态进行鉴权
  const page = useMemo(() => {
    const { pathname } = matches[1];
    const isInWL = whiteList.includes(pathname);

    const isLogined = user.mobile ? true : false;

    if (isInWL) return <Outlet />;
    if (isLogined) return <Outlet />;
    return <Navigate to="/index-no-user?type=1" replace />;
  }, [isLogined, matches, outlet]);
  // 路由后置钩子更改网页标题
  useEffect(() => {
    const title = (matches[1].handle as any)?.title;
    const isHasTitle = typeof title === "string";
    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
  return page;
}



### 路由表定义
// 将需要鉴权的页面放进 被 AuthRoute 组件包裹的 children 里面。
// 例如当访问 /index 路径时，会先执行 AuthRoute，
// 根据对应的条件在决定 <Outlet /> 还是 <Navigate to="/index-no-user" replace />;
const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      {
        path: "",
        element: <Navigate to="/index" replace />,
        handle: { title: "index" },
      },
      {
        path: "index",
        element: useLazy(() => import("@/pages/home/index")),
        handle: { title: "index" },
      },
    ],
  },
  {
    path: "*",
    element: <div>无权限访问 </div>,
  },
  {
    path: "/index-no-user",
    element: useLazy(() => import("@/pages/404")),
    handle: { title: "无法访问" },
  },

];
```

# 拓展性配置 createHashRouter
要想使用最新版本的功能，需要通过最新的语法去创建路由
createBrowserRouter 
``` bash 
const hashRouter = createHashRouter(routes);
export default function App() {
  return (
    # store 是 redux 暴露出来的。目的是将redux挂载进来
    <Provider store={store}>
      <RouterProvider router={hashRouter} />
    </Provider>
  );
}
```





