<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #default>
        <div v-if="isDeleteShow">
          <span @click="$emit('clear-search-histories')">全部删除</span>&nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon name="delete-o"
                  v-else
                  @click="isDeleteShow=true" />
      </template>
    </van-cell>
    <van-cell :title="item"
              v-for="(item,index) in SearchHistories"
              :key="index"
              @click="onSearchItemClick(item,index)">
      <template #default>
        <van-icon v-show="isDeleteShow"
                  name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史数据
        this.SearchHistories.splice(index, 1)
      } else {
        console.log(1);
        //非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>
</style>