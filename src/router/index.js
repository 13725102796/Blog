import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 路由导入
import Home from './home'
import Order from './order'
import My from './my'
//路由集合
const routes = [].concat(Home,Order,My)
export default new Router({
  mode: 'history',
  routes: routes
})
