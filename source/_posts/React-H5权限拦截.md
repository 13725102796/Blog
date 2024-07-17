---
title: React H5权限拦截
date: 2024-02-17 10:49:35
tags:
---

### 功能明细
1. 页面功能划分，游客与用户之间的页面访问控制
2. 游客只能访问指定的页面
3. 超出权限的，需要打回登陆流程

### 实现明细
```bash
# 通过路由前置拦截去实现，React 与 Vue 的实现方式有所差异
# Vue 是通过BeforeRouter，路由前置拦截；React相当于设置一个全局页面开关，由这个页面去控制，改次跳转的路径是否成功

# route.js
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
     ...
    ],
  },
  {
    path: '/index-no-user',
    element: useLazy(() => import('@/pages/404')),
    handle: { title: '无法访问' },
  },

];
export default routes;

# AuthRoute 就相当于一个总页面开关
import { useSelector } from 'react-redux';
import { RootState } from '@/reduces/user';
export const whiteList = [
  '/application',
  ...
];
function AuthRoute() {
  const matches = useMatches();
  console.log(matches);
  const outlet = useOutlet();
  const isLogined = false;
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
    const isHasTitle = typeof title === 'string';
    if (isHasTitle && title) {
      document.title = title;
    }
  }, [matches]);
  return page;
}
```
