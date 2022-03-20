<template>
  <div class="update-photo">
    <img class="img"
         :src="img"
         ref="img">
    <div class="toolbar">
      <div class="cancel"
           @click="$emit('close')">取消</div>
      <div class="confirm"
           @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script> 
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {

  },
  props: {
    img: {
      type: [String, Object],
      require: true
    }
  },
  data () {
    return {
      cropper: null
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        this.$store.commit('setUserInfo', { ...this.$store.state.userInfo, photo: data.data.photo })
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }

    }
  },
  created () {

  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>
 
<style lang='less' scoped>
.update-photo {
  height: 100%;
  background-color: #000;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 140px;
      height: 140px;
      font-size: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>