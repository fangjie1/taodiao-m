<template>
  <div class="article-list"
       ref="article-list">
    <van-pull-refresh v-model="isreFreshLoading"
                      :success-text="refreshSuccessText"
                      :success-duration="1000"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad">
        <ArticleItem v-for="(article,index) in list"
                     :key="index"
                     :article="article">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article"
import ArticleItem from "@/components/article-item"
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: '刷新成功',
      scrollTop: 0
    };
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // if (Math.random() > 0.2) {
        //   JSON.parse('ddddd')
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  },
  mounted () {
    const articleList = this.$refs['article-list']
    // 监听列表滚动位置
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    //把记录到顶部的距离重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 84vh;
  overflow-y: auto;
}
</style> 