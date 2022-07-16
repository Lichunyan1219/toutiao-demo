<template>
  <div>
    <!-- 头部 -->
    <header>
      <!-- 已登录 -->
      <div class="my-login banner {" v-if="isShow">
        <!-- 用户信息 -->
        <div class="my-data">
          <div class="data-my-login">
            <img :src="list.photo" alt="" />
            <p>{{ list.name }}</p>
          </div>
          <van-button class="data-btn">编辑资料</van-button>
        </div>
        <van-grid :border="false">
          <van-grid-item class="data-msg">
            <template>
              <span>{{ list.like_count }}</span>
              <p>头条</p>
            </template>
          </van-grid-item>
          <van-grid-item class="data-msg">
            <template>
              <span>{{ list.art_count }}</span>
              <p>关注</p>
            </template>
          </van-grid-item>
          <van-grid-item class="data-msg">
            <template>
              <span>{{ list.fans_count }}</span>
              <p>粉丝</p>
            </template>
          </van-grid-item>
          <van-grid-item class="data-msg">
            <template>
              <span>{{ list.follow_count }}</span>
              <p>获赞</p>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="no-login banner {" v-else>
        <div class="no-login-data">
          <img src="@/assets/mobile.png" alt="" />
          <span @click="loginBtn">登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 内容 -->
    <main>
      <van-grid :column-num="2" class="my-collect" :clickable="true">
        <van-grid-item text="收藏">
          <i slot="icon"><van-icon color="#eb5253" name="star-o" /> </i>
        </van-grid-item>
        <van-grid-item text="历史记录">
          <i slot="icon"><van-icon name="clock-o" color="#ff9d1d" /> </i>
        </van-grid-item>
      </van-grid>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
    </main>
    <!-- 退出按钮 -->
    <div class="nologin-btn" v-if="isShow">
      <button class="btn-data" @click="logbtn">退出登录</button>
    </div>
  </div>
</template>

<script>
import { users } from '@/API/user'
export default {
  data() {
    return {
      list: {} // 用户信息对象
    }
  },
  computed: {
    isShow() {
      // 两个感叹号转换为布尔值
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 退出登录
    logbtn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', {})
          this.$toast('退出成功')
        })
        .catch(() => {})
    },
    // 登录按钮跳转
    loginBtn() {
      this.$router.push('/login')
    },
    // 获取用户信息
    async loginUser() {
      if (this.isShow) {
        try {
          const res = await users() // console.log(res)
          this.list = res.data.data
          // console.log(this.list)
        } catch (err) {
          this.$toast('请重新登录')
        }
      }
    }
  },
  // 调用用户信息请求函数
  created() {
    this.loginUser()
  }
}
</script>

<style scoped lang="less">
.banner {
  height: 200px;
  background: url(@/assets/banner.png) no-repeat 0 0 / cover;
}
.my-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding: 15px;
  padding-top: 40px;
  :deep(.van-button) {
    width: 58px;
    height: 17px;
    white-space: nowrap;
    padding: 4px;
  }

  .van-button--normal {
    padding: 5px;
  }
  .data-btn {
    border-radius: 5px;
    font-size: 10px;
    color: #666666;
  }
}
.data-my-login {
  display: flex;
  align-items: center;
  img {
    width: 66px;
    height: 66px;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  p {
    margin-left: 10px;
    font-size: 15px;
    color: #ffffff;
  }
}
.my-login {
  :deep(.van-grid-item__content) {
    background-color: transparent;
  }
}
p {
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}
.data-msg {
  color: #ffffff;
  span {
    font-size: 18px;
  }
  p {
    font-size: 12px;
  }
}
.my-login {
  .van-grid {
    padding-top: 15px;
  }
}
.my-collect {
  :deep(.van-grid-item__text) {
    color: #333333;
    font-size: 14px;
    padding-top: 5px;
  }
}
.van-cell-group {
  margin-top: 3px;
  padding: 5px 0;
}
.nologin-btn {
  width: 100%;
  height: 60px;
  margin-top: 3px;
  .btn-data {
    background-color: #fff;
    border: unset;
    width: 100%;
    height: 100%;
    color: #d86262;
    font-size: 15px;
  }
}
.no-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .no-login-data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  span {
    color: #ffffff;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
