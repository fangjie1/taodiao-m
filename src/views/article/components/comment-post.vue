<template>
  <div class="comment-post">
    <van-field ref="fieldPost"
               class="post-field"
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="请输入留言"
               show-word-limit />
    <van-button class="post-btn"
                @click="onPost"
                :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String],
      default: null
    },
    currentComment: {
      type: [Object],
      default: null
    },
    comment: {
      type: Object
    }
  },
  data () {
    return {
      message: '',
      currentMessage: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.$refs.fieldPost.focus();
  },
  methods: {
    async onPost () {
      try {
        this.$toast.loading({
          duration: 0, // 持续时间，0表示持续展示不停止
          forbidClick: true, // 是否禁止背景点击
          message: '发布中...' // 提示消息
        })
        //判断是否为回复的主评论
        if (!this.currentComment) {
          //回复主评论
          this.currentMessage = this.message
        } else {
          //回复次评论,同时将次评论发送给主评论
          this.currentMessage = `回复@${this.currentComment.aut_name}：` + this.message
          await addComment({
            target: this.comment.com_id, //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）	
            content: this.currentMessage,//评论内容	
            art_id: this.articleId //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
          })
        }
        const { data } = await addComment({
          target: this.target, //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）	
          content: this.currentMessage,//评论内容	
          art_id: this.articleId //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
