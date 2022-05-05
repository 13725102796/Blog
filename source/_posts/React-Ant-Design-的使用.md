---
title: React Ant Design 的使用
date: 2019-08-21 10:41:47
tags: AntDesign 
categories: 
- React
---
# 安装
``` bash
# 在项目根目录 执行
yarn add antd

# 在入口文件index.js 全局引入css 一般是 ./src/index.js
import 'antd/dist/antd.css';

#在某个页面局部导入需要使用的组件
import { DatePicker } from 'antd';

ReactDOM.render(<DatePicker />, mountNode);

```

