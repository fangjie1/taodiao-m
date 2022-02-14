<template>
  <div class="search-container">
    <form class="search-from"
          action="/">
      <van-search v-model.trim="SearchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow=false" />
    </form>
    <SearchResult v-if="isResultShow"
                  :SearchText="SearchText" />
    <SearchSuggestion v-else-if="SearchText"
                      :searchText="SearchText"
                      @search="onSearch" />
    <SearchHistory v-else
                   :SearchHistories="SearchHistories"
                   @clear-search-histories="SearchHistories=[]"
                   @search="onSearch" />

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      SearchText: '',
      isResultShow: false,
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    };
  },
  methods: {
    onSearch (val) {
      if (this.SearchText != '') {
        //更新文本框内容
        this.SearchText = val
        // 存储搜索结果
        const index = this.SearchHistories.indexOf(val)
        if (index !== -1) {
          this.SearchHistories.splice(index, 1)
        }
        this.SearchHistories.unshift(val)
        // 渲染搜索结果
        this.isResultShow = true
      }

    },
    onCancel () {
      this.$router.back()
    },
  },
  watch: {
    SearchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  }
}
</script>


<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>