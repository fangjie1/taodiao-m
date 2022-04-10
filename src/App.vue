<template>
  <div id="app">
    <transition :name="transitionName"
                mode="out-in">
      <keep-alive :include="cachePages">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "App",
  computed: {
    ...mapState(['cachePages'])

  },
  data () {
    return {
      transitionName: ""
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route (to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      console.log(to, "to");
      console.log(from, "from");
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    },
  },
};
</script>


<style lang="less">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}

//  左移离开后
// .slide-left-leave-to {
//   opacity: 0;
//    transform: translateX(-100%);
// }
// 左移进入前
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

// 右移离开后
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
//  右移进入前
// .slide-right-enter {
//   opacity: 0;
//    transform: translateX(-100%);
// }
</style>