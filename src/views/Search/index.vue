<template>
  <div>
    <form action="/">
      <van-search
        v-model="SearchValue"
        show-action
        background="#50a3f6"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        class="search-title"
      />
    </form>
    <component
      :is="componentsName"
      :SearchValue="SearchValue"
      @addSearch="addSearch"
    ></component>
  </div>
</template>

<script>
import Searchsuggest from './components/Searchsuggest.vue'
import Searchhistory from './components/Searchhistory.vue'
import Searchresult from './components/Searchresult.vue'
export default {
  data() {
    return {
      SearchValue: '', // 搜索框的值
      SearchComponentsName: false // 判断是否显示搜索结果
    }
  },
  methods: {
    onSearch() {
      this.SearchComponentsName = true

      const res = this.$store.state.history.indexOf(this.SearchValue)
      if (res !== -1 && this.SearchValue.trim() !== '') {
        this.$store.state.history.splice(res, 1)
        this.$store.commit('getHistorys', this.SearchValue)
      } else {
        this.$store.commit('getHistorys', this.SearchValue)
      }
    },
    onCancel() {
      this.$router.back()
    },
    onFocus() {
      this.SearchComponentsName = false
    },
    addSearch(ele) {
      this.SearchValue = ele
      this.onSearch()
    }
  },
  components: {
    Searchsuggest,
    Searchhistory,
    Searchresult
  },
  computed: {
    componentsName() {
      if (this.SearchValue.trim() === '') {
        return 'Searchhistory'
      }
      if (this.SearchComponentsName) {
        return 'Searchresult'
      }
      return 'Searchsuggest'
    }
  }
}
</script>

<style></style>
