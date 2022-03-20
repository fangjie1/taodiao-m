<template>
  <div class="leftItem">
    <van-image width="40"
               height="40"
               fit="cover"
               round
               src="https://img2.baidu.com/it/u=305900223,1827711013&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500" />
    <div class="word">{{msg.msg}}</div>
  </div>
</template>

<script>

export default {
  name: 'LeftItem',
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

    };
  },
}
</script>

<style lang='less' scoped>
.leftItem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  .word {
    max-width: 70%;
    background-color: #cee5f5;
    margin-left: 20px;
    font-size: 26px;
    border-radius: 20px;
    padding: 20px;
  }
}
</style>