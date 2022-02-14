<template>
  <div class="search-suggestion"
       v-if="this.suggestion[0] != null">
    <van-cell icon="search"
              v-for="(text,index) in suggestion"
              :key="index"
              @click="$emit('search',text)">
      <template #title>
        <div v-html="highlight(text)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestion = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>