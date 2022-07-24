<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="GetOnLoad"
      success-text="刷新成功"
      error-text="刷新失败,请检查网络"
    >
      <van-list
        offset="1"
        @load="GetOnLoad"
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <Articleitem
          v-for="ele in articles"
          :key="ele.art_id"
          :article="ele"
        ></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Articleitem from './Articleitem.vue'

import { getChannel } from '@/API/news'
export default {
  data() {
    return {
      articles: '',
      loading: false,
      finished: false,
      times: '',
      error: false,
      refreshing: false

      // pre_timestamp=this.times ||+new Date()s
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getChannel(+new Date(), this.id)
        this.articles = data.data.results
        // console.log(this.articles)
        this.times = data.data.pre_timestamp
      } catch (err) {
        const status = err.response.status
        if (status === 400) {
          throw new Error(err.response.data.message)
        } else {
          this.$toast('刷新失败')
        }
      }
    },
    async GetOnLoad() {
      try {
        const { data } = await getChannel(this.times, this.id)
        this.times = data.data.pre_timestamp
        // if (this.times !== data.data.pre_timestamp) {
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.preTimestamp = data.data.pre_timestamp
        // }
        if (!this.preTimestamp) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },
  created() {
    this.getArticleList()
  },
  components: {
    Articleitem
  }
}
</script>

<style></style>
<!-- /* eslint-disable */ -->
