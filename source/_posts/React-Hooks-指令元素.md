---
title: React Hooks 指令元素
date: 2024-07-17 13:42:38
tags:
---

### 封装一个AddNode Hooks
### 注入一个组件，在需要的时候插入页面
```bash
import * as React from "react";

// import ReactDom from "react-dom";
import { createRoot } from "react-dom/client";
function mountAnywhere(Comp: JSX.Element): void {
  const div: HTMLDivElement = document.createElement("div");
  document.body.appendChild(div);
  const root1 = createRoot(div);
  const Clone = React.cloneElement(Comp, {
    onClose: () => {
      root1.unmount();
      div.parentNode.removeChild(div);
    },
  });

  root1.render(Clone);
}
export default mountAnywhere;

### 植入组件中
import mountAnywhere from '@/hooks/useAddNode';
const Login = (props: Props): JSX.Element => {
  ...
  return (
    <div className={styles.imgPop}>
      <Popup
        visible={visible1}
        onMaskClick={() => handleClose()}
      >
        <div className={styles.lTitle}>注册/登录</div>
        ...
        <div className={styles.loginBtn}>
          <Button
            block
            color="primary"
            fill="solid"
            className={`${styles.btn} ${
              (!user.phone || !user.code) && styles.disabled
            }`}
            onClick={() => submit()}
          >
            登录
          </Button>
        </div>

        <SafeArea position="bottom" />
      </Popup>
    </div>
  );
};
### export 一个函数
export default () => {
  // @ts-ignore
  mountAnywhere(<Login />);
};

### 在任意页面中指令调用
import Login from '../compontents/Login';
useEffect(() => {
    if (user && user.mobile) {
      console.log('已登陆！')
    } else {
      Toast.show('请先登录！');
      Login();
    }
  }, []);
```








