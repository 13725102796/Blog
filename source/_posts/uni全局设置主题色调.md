---
title: UNI全局设置主题色调
date: 2022-06-10 16:19:21
tags: UNI 
categories: 
- UNI 
---

# UNI全局设置主题色调 的思路
* 通过全局设置主类，在主类下添加子类来控制样式
* 基于scss去控制全局色调
* 基于scss mixin去生成多色调
* 通过vuex去控制全局色调的类
* 通过mixin混到全局暴露出全局的类和色调
  
``` bash
// themes.scss
$bg-007aff: #007aff;

$bg-00C997: #00C997; 

@mixin setTheme($color){
  .Text{
    color: $color!important;
  }
  .u-button {
		background-color: $color!important;
	}
  .uni-button-color {
    color: $color!important;
  }
  .uni-modal__btn  {
    color: $color!important;
  }
}

// uni.scss
 @import '@/common/styles/themes.scss';
.THEME-00C997 {
  @include setTheme($bg-00C997)
}
.THEME-007aff {
  @include setTheme($bg-007aff)
}

// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制

const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
      $themeClass: ''
    },
    actions: {
        
    },
    mutations: {
        SETTHEMECLASS(state,data){
            state.$themeClass = data
            uni.setStorageSync('themeClass', data);
        }
    }
})

export default store

// 在app.vue中设置
onLaunch: function() {
  // 可以异步获取
	this.$store.commit('SETTHEMECLASS','00C997')
}

// 全局暴露
computed:{
  GETTHEME(){
    return 'THEME-' + this.$store.state.$themeClass
  },
  GETCOLOR(){
    return '#' + this.$store.state.$themeClass
  }
}



```
# 使用注意
需要在每个页面的根节点，动态注入该类 :class="GETTHEME"

可以通过 GETCOLOR 获取到该主题的色值，辅助某些组件提供api修改状态值


