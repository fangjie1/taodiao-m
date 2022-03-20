<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-info"
         v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar"
                     round
                     fit="cover"
                     :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <!-- <div class="right">
          <van-button size="mini"
                      round
                      to="/user/profile">编辑资料</van-button>
        </div> -->
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login"
         v-else>
      <div class="login-btn"
           @click="$router.push({
            name: 'login',
            query: {
            redirect:'/my'
            }
           })">
        <img class="mobile-img"
             src="~@/assets/mobile.png"
             alt />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- <van-grid class="grid-nav"
              :column-num="2"
              clickable>
      <van-grid-item class="grid-item">
        <i class="toutiao toutiao-shoucang"></i>
        <span class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i class="toutiao toutiao-lishi"></i>
        <span class="text">历史</span>
      </van-grid-item>
    </van-grid> -->
    <van-cell to="/user/profile"
              title="编辑资料"
              is-link />
    <van-cell to="/user/chat"
              title="小思同学"
              is-link
              class="md9" />
    <van-cell title="退出登录"
              class="lgout-cell"
              clickable
              v-if="user"
              @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
import { setItem } from '@/utils/storage'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user']),
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  // data () {
  //   return {
  //     userInfo:
  //   }
  // },
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // 清空搜索历史记录，聊天记录，token
          setItem('TOUTIAO_SEARCH_HISTORIES', '')
          setItem('CHAT-MESSAGE', '')
          this.$store.commit('setUser', '')
          this.$store.commit('setUserInfo', '')
        }).catch(() => {
          // on cancel
        });
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.$store.commit('setUserInfo', data.data)

      } catch (err) {
        this.$toast('获取数据失败,请稍候重试')
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;

    .login-btn {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .mobile-img {
        margin-bottom: 15px;
        width: 132px;
        height: 132px;
      }
      .text {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 76px 32px 23px;
      height: 231px;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          margin-right: 23px;
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .data-stats {
      display: flex;
      align-items: center;

      .data-item {
        display: flex;
        align-items: center;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        height: 130px;
        color: rgb(51, 22, 22);

        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>
