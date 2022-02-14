<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar title="设置昵称"
                 left-text="取消"
                 right-text="完成"
                 @click-left="$emit('close')"
                 @click-right="onConfirm" />
    <div class="field-wrap">
      <van-field ref="fieldName"
                 v-model.trim="localName"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {

  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        } else if (localName === this.value) {
          this.$toast('昵称不能相同')
          return
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created () {

  },
  mounted () {
      this.$refs.fieldName.focus();
  },
}
</script>

<style lang='less' scoped>
.field-wrap {
  padding: 20px;
}
</style>