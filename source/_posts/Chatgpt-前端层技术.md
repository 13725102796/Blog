---
title: Chatgpt 前端层技术
date: 2023-08-17 09:36:58
tags:
---

### 通讯层
采用websocket的方式与后端通讯
``` bash
# isJSON 处理 后端返回的通讯信息
import { isJSON } from "@/common/index"
class WebSocketClass {
  constructor(url) {
    this.lockReconnect = false;  // 是否开始重连
    this.ws = null;
    this.wsUrl = "";  // ws 地址
    this.globalCallback = null;  // 回调方法
    this.userClose = false;  // 是否主动关闭
    this.createWebSocket(url);
  }

  createWebSocket(url) {
    if (typeof (WebSocket) === 'undefined') {
      this.Toast("您的浏览器不支持WebSocket，无法获取数据");
      return false
    }
    this.wsUrl = url;
    try {
      // 创建一个this.ws对象【发送、接收、关闭socket都由这个对象操作】
      this.ws = new WebSocket(this.wsUrl);
      this.initEventHandle();
    } catch (e) {
      this.reconnect(url);
    }
  }

  // 初始化
  initEventHandle() {
    /**
     * 监听WebSocket连接打开成功
     */

    this.ws.onopen = (event) => {
      console.log("WebSocket连接打开");
    };

    /**
     * 连接关闭后的回调函数
     */

    this.ws.onclose = (event) => {
      if (!this.userClose) {
        this.reconnect(this.wsUrl); //重连
      }
    };


    /**
     * 报错时的回调函数
     */

    this.ws.onerror = (event) => {
      console.log('连接异常')
      if (!this.userClose) {
        this.reconnect(this.wsUrl); //重连
      }
    };

    /**
     * 收到服务器数据后的回调函数
     */

    this.ws.onmessage = (event) => {
      console.log(event)
      if (isJSON(event.data)) {
        const jsonobject = JSON.parse(event.data)
        this.globalCallback(jsonobject)
      } else {
        this.globalCallback(event)
      }
    };
  }

  // 关闭ws连接回调
  reconnect(url) {
    if (this.lockReconnect) return;
    this.ws.close();
    this.lockReconnect = true;  // 关闭重连，没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket(url);
      this.lockReconnect = false;
    }, 1000);
  }

  // 发送信息方法
  webSocketSendMsg(msg) {
    const token = uni.getStorageSync("Authorization");

    this.ws && this.ws.send(msg)
    // this.ws && this.ws.send({
    //   data: msg,
    //   success() {
    //     console.log("消息发送成功");
    //   },
    //   fail(err) {
    //     console.log("关闭失败", err)
    //   }
    // });
  }

  // 获取ws返回的数据方法
  getWebSocketMsg(callback) {
    this.globalCallback = callback
  }

  // 关闭ws方法
  closeSocket() {
    if (this.ws) {
      this.userClose = true;
      this.ws.close({
        success(res) {
          console.log("关闭成功", res)
        },
        fail(err) {
          console.log("关闭失败", err)
        }
      });
    }
  }
}
export default WebSocketClass;


# index.vue
import WS from "@/common/websocket.js";
export default {
  mixins: [showBtn],
  data() {
    return {
      ws: null, //websocket对象
    };
  },
  created() {
    this.createWebSocket();
  },
  beforeDestroy() {
    this.ws && this.ws.closeSocket();
  },
  methods: {
    // 新建会话
    createWebSocket() {
      this.ws && this.ws.closeSocket();
      const token = uni.getStorageSync("Authorization");
      this.ws = new WS("wss://" + baseWebSocketUrl + "/ws/" + token + "-0"); //区分聊天（-0）和应用（-1）
      // 回调-服务器返回数据
      this.ws.getWebSocketMsg((data) => {
        this.requesting = false;
        clearTimeout(this.timer);
        if (data.status == 0) {
          this.tempText = this.tempText + data.content;
          this.showText(this.tempText);
          this.records[this.records.length - 1].content = this.tempText;
          this.status = true;
        }

        if (data.status == 2) {
          this.tempText = this.tempText + data.content;
          this.status = false;
          this.showText(this.tempText);
          this.records[this.records.length - 1].content = this.tempText;
          this.tempText = "";
        }
      });
    },
    // 逐字显示
    showText(text) {
      this.latestContent = text.slice(0, this.index);
      this.scrollToBottom();
      if (this.index >= text.length) {
        if (this.status) {
          // this.timer = setTimeout(() => this.showText(text), 50);
          return;
        } else {
          this.waiting = false;
          clearTimeout(this.timer);

          this.index = 1;
          return;
        }
      }
      this.index++;

      this.timer = setTimeout(() => this.showText(text), 50);
    },
    // 发送问题
    sendQuestion(question) {
      this.requesting = true;
      this.ws.webSocketSendMsg(question);
    },
  },
};

```



