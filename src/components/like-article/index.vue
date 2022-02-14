<template>
  <van-loading class="loading"
               v-if="loading" />
  <van-icon v-else
            :color="value===1?'#e5645f':''"
            :name="value===1?'good-job':'good-job-o'"
            @click="onCollect" />
</template>

<script>
import { addLike, deleteLike } from "@/api/article"
export default {
  name: 'LikeArticle',
  components: {

  },
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      loading: false,

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async onCollect () {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          //取消点赞
          await deleteLike(this.articleId)
        } else {
          //点赞文章
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
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