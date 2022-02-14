<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="小智同学"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <!-- 消息列表 -->
    <van-cell-group class="message-list"
                    ref="message-list">
      <div class="chat-wrap"
           v-for="(msg,index) in messages"
           :key="index">
        <RightItem :msg="msg"
                   v-if="msg.type===0" />
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
      message: '',
      socket: null,
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
      if (this.message) {
        // 发送消息
        const data = {
          msg: this.message,
          timestamp: Date.now()
        }
        this.socket.emit('message', data)
        data.type = 0
        this.messages.push(data)
        this.message = ''
      }
    },
    // 自动滚至底部
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  },
  created () {
    //建立连接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.user
      },
      transports: ['websocket']
    })
    this.socket = socket
    // socket.on("connect", () => {
    //   console.log('连接建立成功了');
    // });
    // socket.on("disconnect", () => {
    //   console.log('断开连接了');
    // });
    // 接收消息
    socket.on("message", (data) => {
      data.type = 1
      this.messages.push(data)
    });
  },
  mounted () {
    this.scrollToBottom()
  },
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