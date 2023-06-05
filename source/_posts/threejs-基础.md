---
title: threejs 基础
date: 2023-06-02 09:52:26
tags: Threejs
---

# 创建一个场景 依赖3个对象 
* 场景 
* 相机
* 渲染器
  
``` bash 
# 场景
const scene = new THREE.Scene();
# 相机 PerspectiveCamera（透视摄像机）
# new THREE.PerspectiveCamera(视野角度（FOV）,长宽比（aspect ratio）,近截面（near）,远截面（far） ）
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
# 渲染器
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

```

# 添加一个立方体


