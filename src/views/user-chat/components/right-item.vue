<template>
  <div class="rightItem">
    <div class="word">{{msg.msg}}</div>
    <van-image width="40"
               height="40"
               fit="cover"
               round
               :src="img" />
  </div>
</template>

<script>

export default {
  name: 'RightItem',
  components: {

  },
  props: {
    msg: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      img: this.$store.state.userInfo.photo
    };
  }
}
</script>

<style lang='less' scoped>
.rightItem {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  .word {
    max-width: 70%;
    background-color: #cee5f5;
    margin-right: 20px;
    font-size: 26px;
    border-radius: 20px;
    padding: 20px;
  }
}
</style>