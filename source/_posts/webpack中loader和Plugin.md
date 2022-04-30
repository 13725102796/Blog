---
title: webpack中loader和Plugin
date: 2020-08-25 10:17:14
tags: webpack 
---

# Loader
Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

常见的loader
样式：style-loader、css-loader、less-loader、sass-loader等
文件：raw-loader、file-loader 、url-loader等
编译：babel-loader(把 ES6 转换成 ES5)、coffee-loader 、ts-loader等
校验测试：mocha-loader、jshint-loader 、eslint-loader等
imports-loader、exports-loader等可以向模块注入变量或者提供导出模块功能

# Plugin 
直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入

常见的Plugin
webpack内置UglifyJsPlugin，压缩和混淆代码,通过UglifyES压缩ES6代码。
webpack内置CommonsChunkPlugin，提取公共代码,提高打包效率，将第三方库和业务代码分开打包
ProvidePlugin：自动加载模块，代替require和import 
``` bash
 new webpack.ProvidePlugin({ 
    $: 'jquery',
    jQuery: 'jquery' 
  })
```
html-webpack-plugin可以根据模板自动生成html代码，并自动引用css和js文件
extract-text-webpack-plugin 将js文件中引用的样式单独抽离成css文件
DefinePlugin编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用
HotModuleReplacementPlugin 热更新
