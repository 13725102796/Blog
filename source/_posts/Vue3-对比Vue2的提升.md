---
title: Vue3 对比Vue2的提升
date: 2021-03-27 09:39:50
tags: Vue
categories: 
- Vue
---
# 性能提升
* 响应式系统提升
vue2在初始化的时候，对data中的每个属性使用defineProperty调用getter和setter使之变为响应式对象。如果属性值为对象，还会递归调用。
vue3使用proxy对象重写响应式。proxy的性能本来比defineproperty好，proxy可以拦截属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性
优势： 
1. 可以监听动态新增的属性；
2. 可以监听删除的属性 ；
3. 可以监听数组的索引和 length 属性；

* 编译优化
优化编译和重写虚拟dom，让首次渲染和更新dom性能有更大的提升。
1. vue2 通过标记静态根节点,优化 diff 算法；vue3 标记和提升所有静态根节点,diff 的时候只比较动态节点内容
2. Fragments, 模板里面不用创建唯一根节点,可以直接放同级标签和文本内容
3. 静态提升 patch flag, 跳过静态节点,直接对比动态节点,缓存事件处理函数

* 源码体积的优化
vue3移除了一些不常用的api，例如：inline-template、filter等 使用tree-shaking

# Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
* Options Api
包含一个描述组件选项（data、methods、props等）的对象 options；
API开发复杂组件，同一个功能逻辑的代码被拆分到不同选项 ；
使用mixin重用公用代码，也有问题：命名冲突，数据来源不清晰；
* composition Api
vue3 新增的一组 api，它是基于函数的 api，可以更灵活的组织组件的逻辑。
解决options api在大型项目中，options api不好拆分和重用的问题。





