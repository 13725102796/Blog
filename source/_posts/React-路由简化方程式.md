---
title: React 路由简化方程式
date: 2024-04-17 11:23:58
tags:
---

### 简化版React路由
旧版React 路由写法确实不友好，不够清晰
新版路由 react-router-dom v6.8.x 之后就可以采用类Vue的对象式路由写法

```bash
import {
  Navigate,
  RouteObject,
  useMatches,
  useOutlet,
  Outlet,
} from 'react-router-dom';
import { useLazy } from './lazy';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthRoute />,
    children: [
      {
        path: '',
        element: <Navigate to="/index" replace />,
        handle: { title: '研学甄选' },
      },
      {
        path: 'index',
        element: useLazy(() => import('@/pages/home/index')),
        handle: { title: '研学甄选' },
      },
      {
        path: 'hot',
        element: useLazy(() => import('@/pages/hot/index')),
        handle: { title: '热卖' },
      },
      ...

  },
  {
    path: '*',
    element: <div>无权限访问 </div>,
  },
  {
    path: '/index-no-user',
    element: useLazy(() => import('@/pages/404')),
    handle: { title: '无法访问' },
  },

];
export default routes;

# 引入App.ts

# 这里要注意的是不能采用 BrowserRouter 注入。不然无法生效
# 必须采用 RouterProvider 方式注入

# Provider 是全局注入Store。类似Vuex中的store
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import store from "./reduces/index";
import { Provider } from "react-redux";
import routes from "./router/index";

const hashRouter = createHashRouter(routes);

export default function App() {
  return (
    // <BrowserRouter>

    <Provider store={store}>
      <RouterProvider router={hashRouter} />
    </Provider>
    // </BrowserRouter>
  );
}
```