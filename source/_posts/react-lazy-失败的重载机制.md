---
title: react.lazy 失败的重载机制
date: 2023-04-18 15:16:48
tags: React Lazy
---

# React.lazy
前言： 
在使用 vite + react 构建项目发布生产后，一切都正常使用没有问题。
当开始迭代了第一个版本发布后，部分用户出现 ` Failed to fetch dynamicallyimported module ` 的错误。大致意思就是找不到动态导入的模块。
当用户手动刷新后，又正常显示。

初步原因判断：初版使用的用户访问网站域名后，微信将资源文件缓存下来，后续访问会读取本地资源。当访问到没有缓存的资源时，就会报该错误。因为本地没有该资源，服务器也没有。版本已经迭代了。

解决方案
* 配置 nginx 永不缓存
  该方法直接在服务器修改nginx配置即可
  ``` bash 
  location / {
          include vhost/security/ua_deny.conf;
          include vhost/security/country_deny.conf;
          if ($request_filename ~* .*\.(?:htm|html)$)
          {
                  add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
                  // 或者
                  expires -1;
          }
  }

  ```
  这样每次访问域名都会从服务器拉取最新的index.html

  经过多次Jenkins构建尝试后，发现有以下缺陷：
  1. 第一次，必须要手动清除微信缓存。否则无法读取到新的资源。
  2. 当用户停留在网站，刚好发生更新时，依旧无法获取到新的资源
  3. 资源正确的情况，弱网环境也有可能发生动态加载失败
  
  情况1必然无法避免，情况2和3可以在发生更新时，手动触发一下更新。
  于是有了方案二

* 在React.lazy 的时候，加入异常处理的流程，当正确加载时，正常显示。失败则记录并无感刷新
  首先去研究 React.lazy 该方法
  ``` bash
  # callback: useLazy(() => import("@/pages/home/index")),
  export function useLazy(callback) {
    const LazyRC = React.lazy(callback);
    return (
      <React.Suspense fallback={<Skeleton animated />}>
        <LazyRC />
      </React.Suspense>
    );
  }
  # import() 返回的是一个promise ，那么可以再包多一层
  const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          // 检查是否已经刷新过了
          const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-lazy-refreshed`) ||
              "false"
          );
          if (!hasRefreshed) {
            // 没有刷新过，需要刷新页面刷新
            window.sessionStorage.setItem(`retry-lazy-refreshed`, "true");
            return window.location.reload(); 
          }
          reject(error);
        });
    });
  };

  export function useLazy(callback) {
    # const LazyRC = React.lazy(callback);

    const LazyRC = React.lazy(() => lazyRetry(callback));
    return (
      <React.Suspense fallback={<Skeleton animated />}>
        <LazyRC />
      </React.Suspense>
    );
  }
  ```
