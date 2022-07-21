<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" @click="show = true" v-if="!show" />
      <van-button v-if="show" @click="delAll">全部删除</van-button>
      <van-button v-if="show" @click="show = false">完成</van-button>
    </van-cell>
    <div>
      <van-cell
        v-for="(i, index) in historys"
        :key="index"
        @click="addSearch(i)"
      >
        <template #title>
          <span>{{ i }}</span>
        </template>
        <van-icon name="cross" v-show="show" @click="delHistory(i)" />
      </van-cell>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import { getHistory } from '@/utils'
export default {
  data() {
    return {
      show: false,
      historys: []
    }
  },
  props: {
    SearchValue: {
      type: String,
      required: true
    }
  },
  created() {
    this.historys = this.$store.state.history
    // console.log(this.historys)
  },
  methods: {
    delHistory(ele) {
      const res = this.historys.indexOf(ele)
      // console.log(res)
      this.historys.splice(0, 1)
      this.$store.commit('delHistorys', this.historys)
    },
    delAll() {
      this.historys = []
      this.$store.commit('delHistorys', this.historys)
    },
    addSearch(ele) {
      this.$emit('addSearch', ele)
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  border: unset;
  height: 10px;
  /* margin-right: 0px; */
  color: #969799;
}
.van-icon {
  font-size: 20px;
}
</style>
