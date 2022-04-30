---
title: React开发使用总结
date: 2021-08-22 11:24:31
tags: 
---

# 首先在根index全局引入redux，router,css等
``` bash
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { BrowserRouter,useRoutes } from "react-router-dom"
import store from './reduces/index'
import { Provider } from 'react-redux'
import routes from './routes/index'
const element = useRoutes(routes)
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {element}
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


```
