<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar"
                 title="登录"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <van-form ref="loginForm"
              @submit="onSubmit">
      <van-field v-model="user.mobile"
                 name="mobile"
                 placeholder="请输入手机号"
                 :rules="userFormRules.mobile"
                 type="number"
                 maxlength="11">
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code"
                 name="code"
                 placeholder="请输入验证码"
                 :rules="userFormRules.code"
                 type="number"
                 maxlength="6">
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down v-if="isCountDownShow"
                          :time="1000 * 60"
                          format="ss s"
                          @finish="isCountDownShow = false" />
          <van-button v-else
                      class="send-sms-btn"
                      round
                      size="small"
                      type="default"
                      native-type="button"
                      @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    block
                    type="info"
                    native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    // 登录
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const { data } = await login(user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        // 清除layout的缓存，重新渲染
        this.$store.commit('removeCachePage', 'LayoutIndex')
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    //发送验证码
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        const { data } = await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>