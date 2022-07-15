<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>标签</van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>视频</van-tabbar-item
      >
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>问答</van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i> 我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 3
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 20px;
}
</style>
