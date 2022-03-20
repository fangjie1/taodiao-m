<template>
  <van-cell class="article-item"
            :to="`/article/${article.art_id}`">
    <template #title>
      <div class="title van-multi-ellipsis--l2">
        {{article.title}}
      </div>
    </template>
    <template #label>
      <!-- 三张图片 -->
      <div class="cover-wrap"
           v-if="article.cover.type===3">
        <div class="cover-item"
             v-for="(img,index) in article.cover.images"
             :key="index">
          <van-image class="cover-item-img"
                     fit="cover"
                     lazy-load
                     :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>小白哒哒</span>
        <span>{{article.comm_count}}评论</span>
        <span>2天前</span>
      </div>
    </template>
    <!-- 一张图片 -->
    <template #default
              v-if="article.cover.type===1">
      <van-image class="right-cover"
                 fit="cover"
                 lazy-load
                 :src="article.cover.images[0]" />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .label-info-wrap span {
    font-size: 23px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .van-cell__value {
    padding-left: 25px;
    flex: unset;
    width: 232px;
    height: 146px;
    .right-cover {
      width: 232px;
      height: 146px;
    }
  }
}
</style>