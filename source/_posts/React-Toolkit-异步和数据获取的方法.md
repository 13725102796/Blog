---
title: React-Toolkit 异步和数据获取的方法
date: 2022-07-21 08:14:14
tags: React Redux Toolkit
---
# Thunks 中间件 
Thunks 内部可能有异步逻辑，例如setTimeout、Promises 和async/await. 这使它们成为将 AJAX 调用放入服务器 API 的好地方。
Redux 的数据获取逻辑通常遵循可预测的模式：
* 在请求之前调度“开始”操作，以指示请求正在进行中。这可用于跟踪加载状态以允许跳过重复请求或在 UI 中显示加载指示符。
* 发出异步请求
* 根据请求结果，异步逻辑分派包含结果数据的“成功”操作或包含错误详细信息的“失败”操作。在这两种情况下，reducer 逻辑都会清除加载状态，或者处理来自成功案例的结果数据，或者存储错误值以供潜在显示。

这些步骤不是必需的，但很常用。（如果您只关心一个成功的结果，您可以在请求完成时分派一个“成功”操作，并跳过“开始”和“失败”操作。）

Redux Toolkit 提供了一个createAsyncThunk API 来实现这些操作的创建和分派

# 请求的加载状态
* 请求尚未开始
* 请求正在进行中
* 请求成功，我们现在有了我们需要的数据
* 请求失败，可能有错误消息
``` bash
 {
  // Multiple possible status enum values
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}
``` 




