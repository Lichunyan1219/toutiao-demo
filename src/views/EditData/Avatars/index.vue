<template>
  <div class="data-photo">
    <van-popup
      v-model="show3"
      :style="{ height: '50%', width: '100%' }"
      :close-on-click-overlay="false"
    >
      <img :src="photo" alt="" ref="img" />
    </van-popup>
    <div class="data-img" v-if="show3">
      <van-button @click="noConfirm">取消</van-button>
      <van-button @click="confirm">确定</van-button>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/API/user'
export default {
  data() {
    return {
      show3: true,
      imgUrl: ''
    }
  },
  props: ['photo'],
  mounted() {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      viewMode: 3,
      dragMode: 'none',
      initialAspectRatio: 1,
      aspectRatio: 1,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      zoomOnWheel: true
    })
  },
  methods: {
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        const { data } = await uploadPhoto(fm)
        this.imgUrl = data.data.photo
        this.$emit('confirm', this.imgUrl)
        this.$toast('更新成功')
      })
    },
    noConfirm() {
      this.$emit('noConfirm')
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  position: absolute;
  top: 350px;
  z-index: 9999999999999;
  left: 50%;
}
img {
  width: 375px;
  height: 375px;
}
.data-img {
  display: flex;
  justify-content: space-between;
  z-index: 100000;
  border: unset;
  position: fixed;
  bottom: 0;
  z-index: 999999;
  right: 0;
  left: 0;
  :deep(.van-button--default) {
    background-color: #171716;
    border: unset;
  }
  :deep(.van-button__content) {
    border: unset;
    color: #fff;
    background-color: #171716;
  }
}
:deep(.van-overlay) {
  // position: relative;
  background-color: #171716;
}
.data-photo {
  width: 375px;
  height: 725px;
  position: relative;
}
</style>
