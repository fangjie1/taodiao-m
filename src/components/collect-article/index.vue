<template>
  <van-loading class="loading"
               v-if="loading" />
  <van-icon v-else
            :color="value?'#ffa500':''"
            :name="value?'star':'star-o'"
            @click="onCollect" />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article"
export default {
  name: 'CollectArticle',
  components: {

  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      loading: false
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async onCollect () {
      if (this.$store.state.user) {
        this.loading = true
        try {
          if (this.value) {
            //取消收藏
            await deleteCollect(this.articleId)
          } else {
            //添加收藏
            await addCollect(this.articleId)
          }
          this.$emit('input', !this.value)
          setTimeout(() => {
            this.$toast.success(this.value ? '收藏成功' : '取消收藏')
          })
        } catch (err) {
          this.$toast.fail('操作失败，请重试')
        }
        this.loading = false
      } else {
        this.$dialog.confirm({
          title: '访问提示',
          message: '该功能需要登录才能访问，确认登录吗？',
        })
          .then(() => {
            this.$router.replace({
              name: 'login',
              query: {
                redirect: this.$route.fullPath
              }
            })
          }).catch((e) => {
          });
      }
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