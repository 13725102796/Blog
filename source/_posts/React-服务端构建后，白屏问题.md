---
title: React 服务端构建后，白屏问题
date: 2024-03-10 16:04:07
tags:
---

### 问题描述
在每次打包完发布代码后，访问都会出现白屏现象。提示页面丢失。
一开始以为和Vue一样是浏览器缓存问题，需要新增文件后缀。
但是发现其实后缀已经改变了，脚手架基于Vite生成。
确认配置没有问题后，再次排查发现，只有改动过的页面才会存在该问题
原因是新版的React改成了分片打包，防止首次加载index.js代码超重的问题。
同时还加了一层缓存。这确实是不错的技术方案，不过也带来了一些副作用。

### 处理方案
保留原有的技术方案，增加处理副作用的流程

```bash
# 路由采用动态加载的方式
 element: useLazy(() => import('@/pages/home/index')),
# 可以在 useLazy 加一层处理，如果加载该页面失败，就重新刷新页面。
/**
 * @function useResize 使用的类型
 */
import { Skeleton } from "antd-mobile";
import React from "react";
export namespace Type {
  export type defRC = {
    default: React.ComponentType<any>;
  };
}
const lazyRetry = function (componentImport, name) {
  return new Promise((resolve, reject) => {
    // 动态导入组件
    componentImport()
      .then(resolve)
      .catch((error) => {
        // 检查是否已经刷新过了，防止无限循环。因为有可能该路径本身就是失效了
        const hasRefreshed = JSON.parse(
          window.sessionStorage.getItem(`${name}-retry-lazy-refreshed`) ||
            "false"
        );
        if (!hasRefreshed) {
          // 没有刷新过，需要刷新页面刷新
          window.sessionStorage.setItem(`${name}-retry-lazy-refreshed`, "true");
          return window.location.reload(); //
        }
        reject(error);
      });
  });
};
export function useLazy(callback) {
  // const LazyRC = React.lazy(callback);
  // @ts-ignore
  const LazyRC = React.lazy(() => lazyRetry(callback, "test"));
  return (
    <React.Suspense fallback={<Skeleton animated />}>
      <LazyRC />
    </React.Suspense>
  );
}


```



