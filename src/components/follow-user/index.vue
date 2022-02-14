<template>
  <van-button round
              size="small"
              v-if="isFollowed"
              :loading="loading"
              @click="onFollow">已关注
  </van-button>
  <van-button type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              v-else
              :loading="loading"
              @click="onFollow">关注
  </van-button>

</template>

<script>
import { addFlow, deleteFlow } from "@/api/user"
export default {
  name: 'FollowUser',
  components: {

  },
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loading: false,
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async onFollow () {
      this.loading = true //展示关注按钮的loading状态
      try {
        if (this.isFollowed) {
          //已关注，取消关注
          await deleteFlow(this.userId)
        } else {
          //没有关注，则关注
          await addFlow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = "操作失败，请重试"
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message);
      }
      this.loading = false//关闭关注按钮的loading状态
    }
  },
  created () {
  },
  mounted () {

  },
}
</script>

<style lang='less' scoped>
</style>