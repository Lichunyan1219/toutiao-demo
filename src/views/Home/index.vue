<template>
  <div class="home-template">
    <!-- 顶部标题 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button>
          <van-icon name="search" />
          <span>搜索 </span>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 顶部导航 -->
    <van-tabs v-model="active" swipeable animated>
      <van-tab
        :title="ele.name"
        :name="index"
        v-for="(ele, index) in channelList"
        :key="index"
      >
        <ArticleList :id="ele.id"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="hamburger-btn" @click="isShow">
        <i class="iconfont icon-hanbaocaidan"></i>
      </div>
    </van-tabs>
    <EditChannel
      ref="popup"
      :list="channelList"
      :active="active"
      @delChannel="delChannel"
      @cutChannel="cutChannel"
      @addChannel="addChannel"
    ></EditChannel>
  </div>
</template>

<script>
/* eslint-disable */
import EditChannel from '@/components/EditChannel'
import ArticleList from '@/components/ArticleList.vue'
import { getChannel, delChannel, addChannel } from '@/API/channel'
import { GetChannel, SetChannel } from '@/utils/auth'

export default {
  data() {
    return {
      active: 0,
      activeName: '',
      channelList: []
    }
  },
  computed: {
    user() {
      // 两个感叹号转换为布尔值
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      if (!this.user) {
        const channel = GetChannel()
        if (channel) {
          this.channelList = channel
        } else {
          const { data } = await getChannel()
          this.channelList = data.data.channels
        }
      } else {
        const { data } = await getChannel()
        this.channelList = data.data.channels
      }
      // console.log(this.channelList)
    },
    isShow() {
      // console.log(this.$refs.popup)
      this.$refs.popup.show = !this.$refs.show
    },
    // 删除
    async delChannel(id) {
      this.channelList = this.channelList.filter((ele) => ele.id !== id)
      if (!this.user) {
        SetChannel(this.channelList)
        this.$toast('删除成功')
      } else {
        try {
          await delChannel(id)
          this.$toast('删除成功')
        } catch (err) {
          this.$toast('删除失败')
        }
      }
    },
    // 切换
    cutChannel(index) {
      this.active = index
    },
    // 添加
    async addChannel(ele) {
      this.channelList.push(ele)
      if (!this.user) {
        SetChannel(this.channelList)
        this.$toast('添加成功')
      } else {
        try {
          await addChannel(ele.id, this.channelList.length)
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      }
    }
  },
  components: {
    ArticleList,
    EditChannel
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  .van-button {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border-radius: 16px;
    border: unset;
    // opacity: 0.2;
    span {
      font-size: 14px;
      color: #ffffff;
    }
    .van-icon {
      color: #ffffff;
      font-size: 16px;
      margin-right: 3px;
    }
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid black;
    min-width: 200px;
    font-size: 30px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }
  /deep/ .van.tabs__nav {
    padding-bottom: 0;
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 41px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
.van-tabs__nav--line .van-tabs__nav--complete {
  padding-right: 400px;
}
:deep(.van-tabs--line) {
  .van-tabs__wrap {
    position: fixed;
    top: 40px;
    z-index: 999;
    left: 0;
    right: 0;
  }
}
.home-template {
  padding-top: 90px;
  padding-bottom: 50px;
}
:deep(.van-tab) {
  padding: 0 10px;
}
:deep(.van-tabs__wrap--scrollable) {
  .van-tabs__nav {
    padding-right: 30px;
  }
}
.content {
  padding: 100%;
}
</style>
