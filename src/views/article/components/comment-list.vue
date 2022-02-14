<template>
  <van-list v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            @load="onLoad">
    <CommentItem v-for="(item,index) in list"
                 :key="index"
                 :comment="item"
                 @click-reply="$emit('click-reply',$event)" />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      error: false
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type,//a文章的评论，c评论的回复
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.$emit('onload-success', data.data)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {

  },
}
</script>

<style lang='less' scoped>
</style>