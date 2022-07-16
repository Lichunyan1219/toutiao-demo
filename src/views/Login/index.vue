<template>
  <div class="login-form">
    <!-- 标题栏 -->
    <van-nav-bar title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model.number="user.mobile"
        name="mobile"
        maxlength="11"
        placeholder="请填写手机号"
        :rules="phone"
      >
        <template slot="label"><i class="iconfont icon-shouji"> </i> </template
      ></van-field>
      <van-field
        v-model="user.code"
        name="code"
        maxlength="6"
        placeholder="请填写验证码"
        :rules="code"
      >
        <template slot="label"
          ><i class="iconfont icon-yanzhengma"> </i
        ></template>
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            size="small"
            round
            class="sendBtn"
            color="#ededed"
            type="primary"
            @click.prevent="sendCode"
            v-if="!countDown"
            >发送验证码</van-button
          >
          <!-- 倒计时 -->
          <van-count-down
            :time="60 * 1000"
            v-if="countDown"
            format="ss s"
            @finish="countDown = false"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          class="findbtn-page"
          native-type="submit"
          @click.prevent="onSubmit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
/* eslint-disable */
import { phone, code } from './rules.js' // 表单验证规则
import { login, find } from '@/API/user.js' // 登录验证接口，验证码接口
export default {
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      phone, // 手机号验证规则
      code, // 验证码验证规则
      countDown: false // 是否倒计时
    }
  },
  methods: {
    // 登录注册
    async onSubmit() {
      this.$toast.loading({ message: '登录中...', forbidClick: true })

      try {
        const res = await login(this.user.mobile, this.user.code)
        this.$toast.success('登录成功')
        this.$router.push('/my')
        // 登录成功将返回的数据token存入到vuex中，通过commit方法调用store中的setUser方法改变store中的user值，来存储token
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        if (err.response.status === 507) {
          this.$toast.fail('服务异常，请稍后再试')
        } else {
          this.$toast.fail(err.response.data.message)
        }
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        await this.$refs.from.validate('mobile') // 验证手机号是否为空
        this.countDown = true
        const mobile = this.user.mobile
        await find(mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 507) {
          this.$toast.fail('服务异常，请稍后再试')
        } else {
          this.$toast.fail(err.response.data.message || '手机号不正确')
        }
      }
    },
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  .van-nav-bar {
    background-color: #3296fa;
    height: 64px;
    :deep(.van-nav-bar__content) {
      height: 100%;
    }
    :deep(.van-nav-bar__title) {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .van-nav-bar .van-icon {
    color: #ffffff;
    font-size: 20px;
  }
  :deep(.van-field__label) {
    width: 20px;
    color: #666666;
  }
  :deep(.van-cell__title) {
    .iconfont {
      color: #666666;
      font-size: 19px;
    }
  }
  /deep/.sendBtn {
    width: 76px;
    height: 23px;
    white-space: nowrap;
    .van-button__content {
      color: #666666;
      font-size: 11px;
    }
  }
  /deep/.van-field__button {
    border-left: 1px solid #eeeeee;
  }
  .findbtn-page {
    margin-top: 28px;
  }
  .van-button--info {
    background-color: #6db4fb;
  }
}
</style>
