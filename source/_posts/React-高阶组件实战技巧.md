---
title: React 高阶组件实战技巧
date: 2023-08-6 12:50:41
tags:
---

# 开发一个可复用的滚动列表组件
满足功能如下：
1. 滚动分页请求加载
2. 分页结束提示 到底了
3. 没有数据时提示为空
4. 满足项目大部分分页场景，可复用
  
```bash 
import * as React from 'react';
import { InfiniteScroll, List } from 'antd-mobile';
import { mockRequest } from './mock-request';

import { useState, useEffect, useCallback } from 'react';
import { setSessionStorage } from '@/utils/localStorage';
// interface Props {
//   url: string;
//   params?: Record<string | number | symbol, any>;
// }
let pageSize = 10;

// console.log("reset Page");
const ScrollList = (
  Com: any,
  url: string,
  params: Object = {},
  ComProps: Object = {},
  noDataCb?: Function
) => {
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setpageNo] = useState(0);

  async function loadMore() {
    let tempNo = pageNo + 1;

    const temp = { pageSize, pageNo: tempNo, ...params };

    const data = await window.$api(url, temp);
    const append = data.data.content || data.data;
    // const append = await mockRequest();

    setpageNo(tempNo);
    setData((val) => [...val, ...append]);
    setHasMore(append.length == temp.pageSize);
    if (tempNo == 1 && append.length == 0 && noDataCb) {
      console.log('no data');
      noDataCb();
    }
  }

  const init = useCallback(() => {
    setpageNo(0);
    setData([]);
    loadMore();
  }, []);
  useEffect(() => {
    // const temp = Object.assign({}, { pageSize, pageNo }, params);
  }, []);

  return (
    <>
      {data.map((item, index) => (
        <Com key={index} item={item} {...ComProps} init={init}></Com>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};

export default ScrollList;

# 调用方法
 const Category = () => {
    return ScrollList(
      # GoodCard 为商品卡片组件
      GoodCard,
      # 接口API
      'index/getGoodList',
      # 请求携带参数
      {
        type: 1,
        categoryId: id,
      },
      # 组件参数
      { showTag: true },
      # 无数据请求完成回调
      () => {
        navigate('/index-no-user?type=1', { replace: true });
      }
    );
  };
```

