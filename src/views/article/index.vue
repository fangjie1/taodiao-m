<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="loading">
        <van-loading color="#3296fa"
                     vertical>加载中...
        </van-loading>
      </div>
      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <template slot="icon">
            <van-image class="avatar"
                       round
                       fit="cover"
                       :src="article.aut_photo" />
          </template>
          <template slot="title">
            <div class="user-name">小白哒哒
            </div>
          </template>
          <template slot="label">
            <div class="publish-date">2天前</div>
          </template>
          <template slot="default">
            <FollowUser class="follow-btn"
                        v-model="article.is_followed"
                        :userId="article.aut_id">
            </FollowUser>
          </template>
        </van-cell>
        <!-- 文章内容 -->
        <div class="article-content markdown-body"
             v-html="article.content"
             ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <CommentList :source="article.art_id"
                     :list="commentList"
                     @onload-success="totalCommentCount=$event.total_count"
                     @click-reply="onReplyClick">
        </CommentList>
        <!-- 底部区域 -->
        <div class="
                     article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      size="small"
                      @click="isPostShow=true">写评论
          </van-button>
          <van-icon name="comment-o"
                    :badge="totalCommentCount"
                    color="#777"
                    @click="isPostShow=true" />
          <CollectArticle v-model="article.is_collected"
                          :articleId="article.art_id">
          </CollectArticle>
          <LikeArticle v-model="article.attitude"
                       :articleId="article.art_id">
          </LikeArticle>
          <van-icon name="share"
                    color="#777777" />
        </div>
        <!--发布评论 -->
        <van-popup v-model="isPostShow"
                   position="bottom">
          <CommentPost v-if="isPostShow"
                       :target="article.art_id"
                       @post-success="onPostSuccess" />
        </van-popup>
      </div>
      <!-- 加载失败：404 -->
      <div v-else-if="errStatus===404"
           class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else
           class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click="loadArticle">点击重试
        </van-button>
      </div>
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow "
               v-if="isReplyShow"
               position="bottom"
               style="height: 100%;">
      <CommentReply :comment="currentComment"
                    :articleId="articleId"
                    @close="isReplyShow=false" />
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from "@/api/article"
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        this.loading = false
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        })
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        }
      })
    },
    onPostSuccess (data) {
      //关闭弹层
      this.isPostShow = false
      //将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
      this.totalCommentCount++
    },
    onReplyClick (comment) {
      // 显示弹出层
      this.isReplyShow = true
      this.currentComment = comment
    }
  },
  created () {
    this.loadArticle()
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
@import "./github-markdown-light.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;

    width: 750px;
    word-wrap: break-word;
    word-break: normal;
    background-color: #fff;
    .loading-wrap {
      padding: 200px 32px;
    }
    .article-detail {
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }
      .user-info {
        padding: 0 32px;
        .avatar {
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 24px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }
      .article-content {
        color: #3a3a3a;
        padding: 55px 32px;
        /deep/ p {
          text-align: justify;
        }
      }
    }
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .loading {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
