<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息"
                 class="page-nav-bar"
                 left-arrow
                 @click-left="$router.back()" />
    <input type="file"
           hidden
           ref="file"
           accept="image/*"
           @change="onFileChange">
    <!-- 个人信息 -->
    <van-cell title="头像"
              @click="$refs.file.click()"
              is-link>
      <van-image class="avatar"
                 round
                 fit="cover"
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              :value="user.name"
              is-link
              @click="isUpdateNameShow=true" />
    <van-cell title="性别"
              :value="user.gender===0?'男':'女'"
              @click="isUpdateGenderShow=true"
              is-link />
    <van-cell title="生日"
              :value="user.birthday"
              @click="isUpdateBirthdayShow=true"
              is-link />
    <!-- 修改昵称弹层 -->
    <van-popup v-model="isUpdateNameShow"
               style="height: 100%"
               position="bottom">
      <UpdateName v-if="isUpdateNameShow"
                  @close="isUpdateNameShow=false"
                  v-model="user.name" />
    </van-popup>
    <!-- 修改性别弹层 -->
    <van-popup v-model="isUpdateGenderShow"
               position="bottom">
      <UpdateGender v-if="isUpdateGenderShow"
                    @close="isUpdateGenderShow=false"
                    v-model="user.gender" />
    </van-popup>
    <!-- 修改生日弹层 -->
    <van-popup v-model="isUpdateBirthdayShow"
               position="bottom">
      <UpdateBirthday v-if="isUpdateBirthdayShow"
                      @close="isUpdateBirthdayShow=false"
                      v-model="user.birthday" />
    </van-popup>
    <!-- 修改头像弹层 -->
    <van-popup v-model="isUpdatePhotoShow"
               style="height: 100%"
               position="bottom">
      <UpdatePhoto v-if="isUpdatePhotoShow"
                   @close="isUpdatePhotoShow=false"
                   @update-photo="user.photo=$event"
                   :img="img" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {

  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.$refs.file.value = ''
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
}
</script>

<style lang='less' scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>