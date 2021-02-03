<template>
    <div class="voice-node">
        <div class="top_node">
            <i @click="updateData" v-if="activeTabIndex == 2" class="iconfont iconshuaxin refresh_node"></i>
            <span>语音测试</span>
            <i @click="addItem" v-if="activeTabIndex == 2" class="iconfont icontianjiajiahaowubiankuang delete_node"></i>
        </div>
        <div class="content_node">
            <div class="tab_node">
                <ul>
                    <li
                        v-for="(item, index) in tabList"
                        :class="activeTabIndex === index ? 'active':''"
                        :key="index"
                        @click="changeTerActiveIndex(index)">
                        <a href="javascript: ;">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <div class="body_node">
                <!-- 最近测试-->
                <div v-if="activeTabIndex == 0">
                    <recent-test/>
                </div>

                <!-- 统计测试-->
                <div v-if="activeTabIndex == 1">
                    <statistics-test/>
                </div>

                <!-- 立即测试-->
                <div v-if="activeTabIndex == 2">
                    <promptly-test ref="childrenDom" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import recentTest from './components/recent-test'
import statisticsTest from './components/statistics-test'
import promptlyTest from './components/promptly-test'
export default {
  name: 'Index',
  components: {
    recentTest,
    statisticsTest,
    promptlyTest
  },
  data() {
    return {
      tabList: [
        { name: '最近测试' },
        { name: '统计测试' },
        { name: '立即测试' }
      ],
      activeTabIndex: 0
    }
  },
  methods: {
    changeTerActiveIndex(index) {
      this.activeTabIndex = index
    },
    /* 页面刷新 */
    updateData() {},

    /* 增加地市 */
    addItem() {
      this.$refs.childrenDom.addItem()
    }
  }
}
</script>

<style scoped lang="scss">
.voice-node {
    width: 100%;
    .top_node {
        width: 100%;
        height: 96px;
        font-size: 32px;
        background-color: #409eff;
        color: #fff;
        text-align: center;
        line-height: 96px;
        .refresh_node {
            float: left;
            margin-left: 20px;
            font-size: 28px;
        }
        .delete_node {
            float: right;
            margin-right: 20px;
            font-size: 28px;
        }
    }
    .content_node {
        .tab_node {
            width: 100%;
            height: 64px;
            background-color: #fff;
            line-height: 64px;
            margin-bottom: 20px;
            ul {
                list-style: none;
                width: 100%;
                height: 100%;
                font-size: 28px;
                display: -webkit-box;
                -webkit-box-orient:horizontal;
                border-bottom: 1px solid #e7e7e7;
                li {
                    -webkit-box-flex:1;
                    text-align: center;
                    cursor: pointer;
                    a {
                        font-size: 28px;
                        color: #1b1b1b;
                        padding: 14px 20px;
                    }
                }
                li.active  a{
                    color: #409eff;
                    border-bottom: 3px solid #409eff;
                }
            }
        }
    }
}
</style>
