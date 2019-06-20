<template>
  <div class="test"></div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  name: "test",
  data() {
    return { dataList: [] };
  },
  mounted: function() {
    this.initWebSocket();
  },
  beforeDestroy: function() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    initWebSocket() {
      this.connection();
      let self = this;
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          self.stompClient.send("test");
        } catch (err) {
          console.log("断线了: " + err);
          self.connection();
        }
      }, 5000);
    },
    removeTab(targetName) {
      console.log(targetName);
    },
    connection() {
      // 建立连接对象
      this.socket = new SockJS("http://39.107.247.223"); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket);
      // 定义客户端的认证信息,按需求配置
      var headers = {
        login: "13008840525",
        passcode: "Abcd.1234",
        // additional header
        "client-id": "my-client-id"
      };
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,
        frame => {
          this.stompClient.subscribe("/topic/chat_msg", msg => {
            // 订阅服务端提供的某个topic
            consolel.log(msg.body); // msg.body存放的是服务端发送给我们的信息
          });
        },
        err => {}
      );
    },
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    }
  }
};
</script>
<style scoped>
.main {
  min-height: 500px;
}
</style>
