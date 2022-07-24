<template>
  <div>
    <div class="title">
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 头像 -->
    <!-- 通过ref手动调用文件选择的点击事件 -->
    <div class="head" @click="$refs.file.click()">
      <van-cell title="头像" center
        ><van-image
          round
          cover
          :src="!!imgUrl ? imgUrl : userData.photo" /><van-icon name="arrow"
      /></van-cell>
    </div>
    <!-- 昵称 -->
    <div class="nackname" @click="show = true">
      <van-cell title="昵称">
        <span>{{ userData.name }}</span
        ><van-icon name="arrow"
      /></van-cell>
    </div>
    <!-- 性别 -->
    <div class="gender" v-if="userData.gender === 1" @click="show1 = true">
      <van-cell title="性别">
        <span> 女</span><van-icon name="arrow"
      /></van-cell>
    </div>
    <div class="gender" v-if="userData.gender === 0" @click="show1 = true">
      <van-cell title="性别">
        <span> 男 </span><van-icon name="arrow"
      /></van-cell>
    </div>
    <!-- 生日 -->
    <div class="birthday" @click="show2 = true">
      <van-cell title="生日">
        <span>{{ userData.birthday }}</span
        ><van-icon name="arrow"
      /></van-cell>
    </div>
    <!--  昵称弹出层 / OK-->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-nav-bar
        title="更新信息"
        left-text="取消"
        right-text="保存"
        v-model="message"
        @click-left="show = false"
        @click-right="changeDataName"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <!--  性别弹出层  -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="选择性别"
        ref="sex"
        show-toolbar
        :columns="columns"
        @confirm="changeDataSex"
        @cancel="show1 = false"
      />
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="show2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        ref="age"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeDataAge"
        @cancel="show2 = false"
      />
    </van-popup>
    <!-- 头像弹出层 -->
    <Avatars
      :photo="photo"
      v-if="show3"
      @confirm="confirm"
      @noConfirm="noConfirm"
    />
    <!-- 头像选着器 -->
    <!-- file 文件选着输入框 hidden 文件选择框隐藏 accept 文件选择类型判断 -->
    <input type="file" hidden accept=".png,.jpg" ref="file" />
  </div>
</template>

<script>
import moment from 'moment' // 引入moment

import { userData, changeUserData } from '@/API/user'
import dayjs from '@/utils/dayjs.js'
import Avatars from './Avatars'
export default {
  data() {
    return {
      userData: {},
      show: false,
      show1: false,
      show2: false,
      show3: false,
      message: '',
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 7, 22),
      currentDate: new Date(2020, 0, 17),
      columns: ['男', '女'],
      sex: [{ 男: 0 }, { 女: 1 }],
      dayjs,
      photo: '',
      imgUrl: ''
    }
  },
  components: {
    Avatars
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 更新性别
    async changeDataSex() {
      const sex = this.$refs.sex.getValues().join('')
      const i = sex === '男' ? 0 : 1
      this.show1 = !this.show1
      await changeUserData({
        gender: i
      })
      this.getUserData()
    },
    // 更新年纪
    async changeDataAge(value) {
      const data = moment(value).format('YYYY-MM-DD')
      this.show2 = !this.show2
      await changeUserData({
        birthday: data
      })
      this.getUserData()
    },
    // 更新昵称
    async changeDataName() {
      this.show = !this.show
      await changeUserData({
        name: this.message
      })
      this.getUserData()
    },
    // 获取用户信息
    async getUserData() {
      const res = await userData()
      this.userData = res.data.data
    },
    // 更新头像
    confirm(img) {
      this.show3 = false
      this.imgUrl = img
    },
    noConfirm() {
      this.show3 = false
    }
  },

  created() {
    this.getUserData()
  },
  mounted() {
    // 通过原生触发选着框的内容改变事件获取选择的文件
    // 拿到的图片是一个file对象形式
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.show3 = true
        // 解决取消上传同一张图片无法再次打开
        this.$refs.file.value = ''
      }
    })
  }
}
</script>

<style lang="less" scoped>
.title {
  :deep(.van-nav-bar) {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  :deep(.van-nav-bar) {
    .van-icon {
      color: #fff;
    }
  }
}
.head {
  .van-image--round {
    width: 30px;
    height: 30px;
  }
}
</style>
