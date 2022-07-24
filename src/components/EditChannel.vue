<template>
  <!-- 频道弹框 -->

  <div class="container">
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      close-icon="close"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="EditChannelAll">
        <div class="EditChannelTitle">
          <van-cell title="我的频道">
            <van-button
              size="mini"
              round
              class="EditChannel-btn"
              @click="isShow = !isShow"
              >{{ !isShow ? '编辑' : '完成' }}</van-button
            >
          </van-cell>
          <van-grid :gutter="10">
            <van-grid-item
              :text="ele.name"
              :class="{ active111: index === active }"
              v-for="(ele, index) in list"
              :key="ele.id"
              @click="delChannel(ele.id, index)"
              ><template #icon v-if="ele.id!=0">
                <van-icon name="cross" v-show="isShow" /> </template
            ></van-grid-item>
          </van-grid>
        </div>
        <div class="recommendedChannel">
          <van-cell title="推荐频道"> </van-cell>
          <van-grid :gutter="10">
            <van-grid-item
              :text="ele.name"
              v-for="ele in allChannels"
              :key="ele.id"
              @click="addChannel(ele)"
              ><template #icon><van-icon name="plus" /></template
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAll } from '@/API/channel'
export default {
  data() {
    return {
      show: false,
      channelsAll: [],
      isShow: false
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getChannelAll() {
      const { data } = await getChannelAll()
      this.channelsAll = data.data.channels
      // console.log(this.channelsAll)
    },
    // 删除 / 切换 频道列表
    delChannel(id, index) {
      if (id !== 0 && this.isShow) {
        this.$emit('delChannel', id)
      } else if (!this.isShow) {
        this.$emit('cutChannel', index)
      }
    },
    addChannel(ele) {
      this.$emit('addChannel', { ...ele })
    }
  },
  created() {
    this.getChannelAll()
  },
  computed: {
    allChannels() {
      return this.channelsAll.filter((ele) => {
        return !this.list.find((item) => item.id === ele.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.EditChannelAll {
  padding-top: 50px;
}
.EditChannel-btn {
  color: red;
  border: 1px solid red;
  padding: 0 10px;
}
.EditChannelAll {
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        // line-height: 0.32rem;
        z-index: 100;
      }
      .van-icon {
        font-size: 12px;
      }
    }
  }
}
// 推荐频道的样式
.recommendedChannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    // flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0px;
    }
    .van-icon {
      top: -15px;
    }
  }
}
:deep(.van-grid-item__content) {
  background-color: #e5e5e5;
}
:deep(.active111) {
  color: red !important;
}
:deep(.van-grid-item__text) {
  color: unset;
}
</style>
