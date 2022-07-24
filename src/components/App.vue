<template>
  <div id="app">
    <!-- 上传文件 -->
    <input type="file" ref="file" hidden accept=".png,.jpg" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="40"
        height="40"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>

    <!-- 弹出层 -->
    <van-popup v-model="show">
      <UpdatePhoto :photo="photo"></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from './UpdatePhoto.vue'
// 如何拿到用户选择的图片?
// - 监听input的change事件
export default {
  components: {
    UpdatePhoto
  },
  data() {
    return {
      show: false,
      photo: ''
    }
  },
  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      // 图片的src能识别什么?
      //  - 图片相对/绝对路径
      //  - base64 DateUrl
      //  - file,blob对象的url
      const file = e.target.files[0]
      // file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      const fr = new FileReader()
      fr.readAsDataURL(file)

      fr.onload = (e) => {
        this.photo = e.target.result
        this.show = true
      }
    })
  },

  created() {}
}
</script>

<style lang="less"></style>
