<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  size="mini"
                  @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel,index) in myChannels"
                     :key="channel.id"
                     @click="onMyChannelClick(channel,index)">
        <template #icon>
          <van-icon v-show="isEdit && !fixChannels.includes(channel.id)"
                    name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text"
                :class="{active:index===active}">{{channel.name}}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="channel in recommendChannels"
                     :key="channel.id"
                     icon="plus"
                     :text="channel.name"
                     @click="onAddChannel(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
  },
  data () {
    return {
      allChannels: [],//所有频道
      isEdit: false,//控制编辑状态
      fixChannels: [0],//固定频道，不允许删除

    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }

  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    //添加频道
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            swq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败,请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    //删除频道
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态
        //如果是固定频道,则不删除
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        //删除频道项
        this.myChannels.splice(index, 1)
        //如果删除的频道项在激活的频道项之前，则更新激活频道项
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
        //处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除失败,请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: unset;
        .van-icon-clear {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>