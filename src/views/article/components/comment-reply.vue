<template>
  <div class="comment-reply">
    <van-nav-bar title="回复详情">
      <template #left>
        <van-icon name="cross"
                  @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 主评论 -->
      <CommentItem :comment="comment"
                   @click-reply="isReplyShowFn" />
      <van-cell :title="comment.reply_count>0?`相关回复共${comment.reply_count}条`:'暂无回复'" />
      <!-- 评论回复列表 -->
      <CommentList :list="commentList"
                   :source="comment.com_id"
                   type='c'
                   @click-reply="onReplyClick" />
    </div>
    <!--底部区域 -->
    <div class="post-wrap">
      <van-button class="post-btn"
                  size="small"
                  round
                  @click="isReplyShowFn">
        写评论
      </van-button>
    </div>
    <!-- 发布回复 -->
    <van-popup v-model="isReplyShow"
               position="bottom">
      <CommentPost v-if="isReplyShow"
                   :target="currentComment?currentComment.com_id:comment.com_id"
                   :articleId="articleId"
                   @post-success="onPostSuccess"
                   :currentComment="currentComment"
                   :comment="comment" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isReplyShow: false,
      commentList: [],
      currentComment: null
    }
  },
  computed: {
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onPostSuccess (data) {
      //关闭弹层
      this.isReplyShow = false
      //更新主评论的回复数量
      this.comment.reply_count++
      //更新次评论的回复数量
      if (this.currentComment) {
        this.currentComment.reply_count++
      }
      //将回复评论内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      // 显示弹出层
      this.isReplyShow = true
      this.currentComment = comment
    },
    isReplyShowFn () {
      this.isReplyShow = true
      this.currentComment = null
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>