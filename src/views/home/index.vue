<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <template #title>
        <van-button class="search-btn"
                    type="info"
                    size="small"
                    round
                    icon="search"
                    to="/search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs"
              v-model="active"
              animated
              swipeable>
      <van-tab :title="channel.name"
               v-for="channel in channels"
               :key="channel.id">
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn"
             @click="isChennelEditShow=true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChennelEditShow"
               closeable
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '100%' }">
      <ChannelEdit v-if="isChennelEditShow"
                   :myChannels="channels"
                   :active="active"
                   @update-active="onUpdateActive"
                   @updateMyChannelList="myChannels=$event"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getUserChannels } from '@/api/user'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],//频道列表
      isChennelEditShow: false//控制编辑频道弹出层的显示状态
    };
  },
  computed: {
    ...mapState(['user']),
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取频道列表
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 如果已登录，则请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 否则，则获取本地存储中的频道列表
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 如果本地有,则用本地的频道列表
            channels = localChannels
          } else {
            // 否则请求获取默认的频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 跳转到对应频道,关闭频道弹层
    onUpdateActive (index, isChennelEditShow = true) {
      this.active = index
      this.isChennelEditShow = isChennelEditShow
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // 导航栏
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 550px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  // 频道列表
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
      .van-tabs__nav {
        padding: 0;
        .van-tab {
          min-width: 200px;
          border-right: 1px solid #edeff3;
          font-size: 30px;
          color: #777;
        }
        .van-tab:nth-last-of-type(4) {
          border-right: none;
        }
        .van-tab--active {
          color: #333;
        }
        .van-tabs__line {
          width: 31px;
          height: 6px;
          background-color: #3296fa;
          bottom: 8px;
        }
        .placeholder {
          flex-shrink: 0;
          width: 66px;
          height: 82px;
        }
        .hamburger-btn {
          position: fixed;
          right: 0;
          width: 66px;
          height: 82px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          opacity: 0.902;
          i.toutiao {
            font-size: 33px;
          }
          &::before {
            content: "";
            width: 1px;
            height: 70%;
            background-image: url("~@/assets/gradient-gray-line.png");
            background-size: contain;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}
</style>