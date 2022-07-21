<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
      error-text="刷新失败,请检查网络"
    >
      <van-list
        offset="1"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onRefresh"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell
          :title="ele.title"
          v-for="ele in SearchResultList"
          :key="ele.art_id"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
/* eslint-disable */
import { getSearchResult } from '@/API/search'
export default {
  name: 'Searchresult',
  data() {
    return {
      SearchResultList: [],
      isLoading: false,
      page: 1,
      perPage: 20,
      loading: false,
      finished: false,
      error: false
    }
  },
  props: {
    SearchValue: {
      type: String,
      required: true
    }
  },
  methods: {
    // 页面进入渲染请求
    async getSearchResults() {
      try {
        const { data } = await getSearchResult(
          this.SearchValue,
          this.page,
          this.perPage
        )
        this.SearchResultList = data.data.results
      } catch (err) {
        throw new Error(err.response.data.message)
      }
    },
    // 下拉刷新
    async onRefresh() {
      this.page++
      this.perPage += 10
      try {
        const { data } = await getSearchResult(
          this.SearchValue,
          this.page,
          this.perPage
        )
        if (this.isLoading) {
          this.SearchResultList.unshift(...data.data.results)
        } else {
          this.SearchResultList.push(...data.data.results)
        }
        if (data.data.results.length === 0) {
          return (this.finished = true)
        }
        this.SearchResultList = data.data.results
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
        // this.finished = true
      }
    },
    onLoad() {}
  },
  created() {
    this.getSearchResults()
  }
}
</script>
<style></style>
