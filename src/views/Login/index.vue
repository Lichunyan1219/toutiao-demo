<template>
  <div class="login-form">
    <!-- 标题栏 -->
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model.number="user.mobile"
        name="mobile"
        maxlength="11"
        placeholder="请填写手机号"
        :rules="message.phone"
      >
        <template slot="label"><i class="iconfont icon-shouji"> </i> </template
      ></van-field>
      <van-field
        v-model.number="user.code"
        name="code"
        maxlength="6"
        placeholder="请填写验证码"
        :rules="message.code"
      >
        <template slot="label"
          ><i class="iconfont icon-yanzhengma"> </i
        ></template>
        <template #button>
          <van-button
            size="small"
            round
            class="sendBtn"
            color="#ededed"
            type="primary"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          class="findbtn-page"
          native-type="submit"
          @click="onSubmit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, find } from '@/API/user.js'
// import {  } from '@/API/user.js'

export default {
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      message: {
        phone: [
          {
            required: true,
            message: '请填写手机号'
            // trigger: 'blur'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '请填写正确的手机号'
            // trigger: 'onblur'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码'
            // trigger: 'onblur'
          },
          {
            pattern: /^\d{6}$/,
            message: '请填写正确的验证码'
            // trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录注册
    async onSubmit() {
      try {
        const res = await login(this.user.mobile, this.user.code)
        console.log(res)
        console.log('登录成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        const mobile = this.user.mobile
        const res = await find(mobile)
        console.log(res)
      } catch (err) {}
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
