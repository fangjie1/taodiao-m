<template>
  <div class="layout-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar class="layout-tabbar"
                route>
      <van-tabbar-item to="/">
        <template slot="icon">
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template slot="icon">
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    // 缓存layout
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>

<style scoped lang="less">
.layout-container .layout-tabbar {
  i.toutiao {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>