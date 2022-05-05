---
title: React-Router 主要功能详解
date: 2022-04-19 10:18:43
tags: React Router
categories: 
- React
---

# 安装
` $ npm install react-router-dom@6`

# 使用 （使用组件注册路由）
``` bash 
import React from "react";
import { Routes, Route, Link,BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
function App() {
  return (
    <div >
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home(){
  return (
    <div>
      Home
      <Link to="/about">About</Link>
    </div>
  )
}
function About(){
  return (
    <div>About<Link to="/">About</Link></div>
  )
}
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

```

# 使用useRoutes注册路由
``` bash 
//路由表配置：src/routes/index.js
import About from '../pages/About'
import Home from '../pages/Home'
import {Navigate} from 'react-router-dom'

export default [
	{
		path:'/about',
		element:<About/>,
    children: [{
      path:'aboutChild1',
		  element:<AboutChild1 />,
    },{
      path:'aboutChild2',
		  element:<AboutChild2 />,
    }
    ]
	},
	{
		path:'/home',
		element:<Home/>
	},
	{
		path:'/',
		element:<Navigate to="/about"/>
	}
]

//App.jsx
import React from 'react'
import {NavLink,useRoutes} from 'react-router-dom'
import routes from './routes'

export default function App() {
	//根据路由表生成对应的路由规则
	const element = useRoutes(routes)
	return (
		<div>
			......
      {/* 注册路由 */}
      {element}
		  ......
		</div>
	)
}

```
# <Outlet> 子路由渲染位置

# useNavigate 返回一个函数用来实现编程式导航。
``` bash 
import {useNavigate} from 'react-router-dom'
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Demo() {
  const navigate = useNavigate()
  const handle = () => {
    //第一种使用方式：指定具体的路径
    navigate('/login', {
      replace: false,
      state: {a:1, b:2}
    }) 
    //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
    navigate(-1)
  }
  
  return (
    <div>
      <button onClick={handle}>按钮</button>
    </div>
  )
}

```
# useParams 返回当前匹配路由的params参数 | useSearchParams 用于读取和修改当前位置的 URL 中的查询字符串。 | useLocation 获取当前 location 信息
``` bash 
# useParams
import { Routes, Route, useParams,useSearchParams,useLocation } from 'react-router-dom';
function ProfilePage() {
  // 获取URL中携带过来的params参数
  let { id } = useParams();
  // 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。
  const [search,setSearch] = useSearchParams()
  // update
  const id = search.get('id')
  setSearch('id=12123123') 
  // 获取当前 location 信息
  const x = useLocation()

}

function App() {
  return (
    <Routes>
      <Route path="users/:id" element={<User />}/>
    </Routes>
  )
}

```
# 路由钩子 routerWillLeave 
可以拦截正在发生的跳转，或在离开 route 前提示用户。
routerWillLeave 返回值有以下两种：
* return false 取消此次跳转
* return 返回提示信息，在离开 route 前提示用户进行确认。


