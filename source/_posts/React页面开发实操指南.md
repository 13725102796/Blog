---
title: React页面开发实操指南
date: 2023-07-10 10:09:48
tags:
---

# 样式开发
主流引用 hooks 库中的 useClass ，方便条件渲染判断。
个人感觉比较鸡肋，故而很少使用。
因为其内部是通过函数转化的，每次渲染页面用到的地方都会先跑一遍该函数，将其转化成正常的className
```bash
export function useClass(style: CSSModuleClasses) {
  return (className: string | string[] | Record<string, boolean>) => {
    const arrStr = (arr: string[]) => {
      return arr.map((item) => style[item] || item).join(" ") + " ";
    };
    // 数组写法
    if (Array.isArray(className)) {
      return arrStr(className);
    }
    // 字符串写法
    if (typeof className === "string") {
      const target = className.replace(/ +/g, ",").split(",");
      return arrStr(target);
    }
    // 对象写法
    const target = Object.keys(className).filter((key) => className[key]);
    return arrStr(target);
  };
}

```
本质是，减少代码量，增加客户端的渲染压力。


# 页面开发重点 useState useEffect
``` bash
# useState 是定义一个 可以驱动视图的变量
const [showUs, setShowUs] = useState(false);
setShowUs 可以改变 showUs 的值，showUs变化，进而更新绑定的视图模块

<List.Item onClick={() => setShowUs(true)} >
  联系客服
</List.Item>
 <CenterPopup
  visible={showUs}
  onMaskClick={() => {
    setShowUs(false);
  }}
>
  <div className={styles.myContent}>
    <div className={styles.btnBox}>
      <a href="tel:020-XXXXXXXX">
        <div className={styles.confirm}>立即拨打</div>
      </a>
      <div className={styles.cancel} onClick={() => setShowUs(false)}>
        取消
      </div>
    </div>
  </div>
</CenterPopup>
# 至始至终都是单向的数据流，这是与Vue中v-model，最本质的区别
# 使用setState进行状态更新时，React可能会将多个setState调用合并成一个，并在稍后异步地更新组件
# 即时更新的方法
this.setState((props)=>({
  num:props.num+1 // 实现state的num属性值加1
}));
# useEffect 包含生命周期的开始阶段和更新阶段以及销毁阶段

 useEffect(() => {
    if (user && user.mobile) {
      window.$api('index/getUserDetail').then((res) => {
        localStorage.setItem('userMsg', JSON.stringify(res.data));
        if (!localStorage.getItem('promoterStatus')) {
          localStorage.setItem('promoterId', res.data.promoterId);
        }
      });
    }
    return ()=>{
      #销毁需要TODO
    }
  }, ['监听需要的参数']);

# 两者都只能写在函数的第一层，因为它们都是通过数组下标来识别执行哪个方法。写到第二层会抛出异常了


```

# 数据流 Store 用的是 react-redux


``` bash 
import { useSelector, useDispatch } from 'react-redux';
# 获取store中的数据
const user = useSelector((state: RootState) => state.user.userMsg);

# 事件分发 
const dispatch = useDispatch();
dispatch(setUserMsg([]));

# 定义数据 切片 toolkit
import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
const counterSlice = createSlice({
  name: "userMsg",
  initialState: {
    orderUserMsg: getLocalStorage("orderUserMsg", "array") || [],
    selectSchool: getLocalStorage("selectSchool", "object") || {},
  },
  reducers: {
    setUserMsg: (state, action) => {
      console.log(action);
      setLocalStorage("orderUserMsg", action.payload);
      state.orderUserMsg = action.payload;
    }
  },
});
export const { setUserMsg, setSelectSchool } = counterSlice.actions;

export interface RootState {
  userMsg: any;
}
export default counterSlice.reducer;

# 数据切片集中输出
import counterSlice from "./test";
import starSlice from "./setStar";
import userSlice from "./user";
import userMsgSlice from "./userMsg";
import { configureStore } from "@reduxjs/toolkit";
import thunksSlice from "./thunks";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    thunks: thunksSlice,
    star: starSlice,
    user: userSlice,
    userMsg: userMsgSlice,
  },
});

export default store;
```

掌握以上这些就可以正常开放React 页面了