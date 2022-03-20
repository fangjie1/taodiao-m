<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="小思同学"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <div class="chat-wrap">
        <LeftItem :msg="{msg:'您好，我是小思有什么可以帮您的吗？'}" />
      </div>
      <div class="chat-wrap"
           v-for="(msg,index) in messages"
           :key="index">
        <RightItem :msg="msg"
                   v-if="msg.name=='me'" />
        <LeftItem :msg="msg"
                  v-else />
      </div>
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model.trim="message"
                 placeholder="请输入消息"
                 :border="false" />
      <van-button class="van-btn"
                  type="primary"
                  @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { setItem, getItem } from '@/utils/storage'
import LeftItem from './components/left-item.vue'
import RightItem from './components/right-item.vue'
export default {
  name: 'UserChat',
  components: {
    LeftItem,
    RightItem
  },
  props: {

  },
  data () {
    return {
      message: '',//输入框的内容
      socket: null, //客户端和服务器端建立连接的socket对象
      messages: getItem('CHAT-MESSAGE') || []
    };
  },
  computed: {

  },
  watch: {
    messages () {
      setItem('CHAT-MESSAGE', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    onSend () {
      if (this.message.trim().length === 0) return
      // 发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push({
        name: 'me',
        msg: this.message,
      })
      this.message = ''
    },
    // 最后一条消息滚至底部
    scrollToBottom () {
      const list = document.querySelector('.message-list')
      if (list) {
        list.scrollTop = list.scrollHeight
        // list.scrollIntoView({
        //   behavior: 'smooth'
        // })
      }
    }
  },
  created () {
    //建立连接
    const socket = io('ws://geek.itheima.net', {
      query: {
        token: this.$store.state.user
      },
      transports: ['websocket']
    })
    this.socket = socket

    // 测试是否连接成功
    socket.on("connect", () => {
      console.log('连接建立成功了');
    });
    socket.on("disconnect", () => {
      console.log('断开连接了');
    });

    // 接收后端消息
    socket.on("message", (data) => {
      this.messages.push({
        name: 'xs',
        msg: data.msg
      })
    });
  },
  mounted () {
    this.scrollToBottom()

  },
  destroyed () {
    this.socket.close()
    this.socket = null
  }
}
</script>

<style lang='less' scoped>
.message-list {
  position: fixed;
  top: 92px;
  bottom: 100px;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding-bottom: 10px;
}

.send-message-wrap {
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  .van-btn {
    border: none;
    width: 120px;
    height: 60px;
    white-space: nowrap;
  }
}
</style>