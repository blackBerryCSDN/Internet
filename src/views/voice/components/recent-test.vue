<template>
    <div class="recent_test_wrap">
        <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :offset="1"
            :immediate-check="false"
            @load="onLoadList"
            finished-text="已全部加载完成"
          >
            <div class="item_node" v-for="(item, index) in testList" :key="index">
                <van-row>
                    <van-col span="8">
                        <div class="item_nav item_title">{{item.taskName}}</div>
                        <div class="item_nav">通话时长:{{item.talkTime}}</div>
                        <div class="item_nav">MOS评分:{{item.mosScore}}</div>
                    </van-col>
                    <van-col span="8">
                        <div class="item_nav">{{item.assignTime}}</div>
                        <div class="item_nav">测试结果:{{item.resultName}}</div>
                        <div class="item_nav">匹配度:{{item.matchDegree}}</div>
                    </van-col>
                    <van-col span="8">
                        <div class="item_nav">
                            状态：<button type="button" :class="item.status == '3'? 'btn_complete':'btn_testing'">{{item.statusStr}}</button>
                        </div>
                        <div class="item_nav">掉话是否:{{item.dropWordsStr}}</div>
                        <div class="item_nav more_node" @click="showMoreInfo(item)">更多</div>
                    </van-col>
                </van-row>
            </div>
            <van-popup v-model="moreShow">
                <div class="title_node">
                    <span>更多</span>
                </div>
                <div class="body_wrap">
                    <ul>
                        <li>测试时间：{{moreInfo.assignTime}}</li>
                        <li>通话时长：{{moreInfo.talkTime}}</li>
                        <li>测试结果：{{moreInfo.resultName}}</li>
                        <li>主叫号码：{{moreInfo.localNumber}}</li>
                        <li>被叫号码：{{moreInfo.otherNumber}}</li>
                        <li>MOS评分：{{moreInfo.mosScore}}</li>
                        <li>单通是否：{{moreInfo.singlePassStr}}</li>
                        <li>断续是否：{{moreInfo.oRefSpeechRate}}</li>
                        <li>掉话是否：{{moreInfo.dropWordsStr}}</li>
                        <li>匹配度：{{moreInfo.matchDegree}}</li>
                        <li>信号衰减：{{moreInfo.signalAttenuation}}</li>
                    </ul>
                    <div class="close_node">
                        <van-button @click="closeDialog" color="#409eff" round block>确定</van-button>
                    </div>
                </div>
            </van-popup>
          </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { getTaskReport } from '@/api/voice/voice'
export default {
  name: 'RecentTest',
  data() {
    return {
      isLoading: false,
      finished: false,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      testList: [],
      moreInfo: {},
      moreShow: false
    }
  },
  created() {
    this.onRefresh()
  },
  methods: {
    getTaskReport(isRefresh) {
      const params = {}
      params.currentPage = this.currentPage
      params.pageSize = this.pageSize
      getTaskReport(params).then(res => {
        if (isRefresh) {
          this.testList = res.data.list
          Toast.success('刷新成功')
          this.isLoading = false
        } else {
          if (res.data.total <= this.testList.length) {
            this.finished = true
          } else {
            for (const i in res.data.list) {
              this.testList.push(res.data.list[i])
            }
          }
          this.loading = false
        }
      })
    },
    /* 加载 */
    onLoadList() {
      this.currentPage++
      this.getTaskReport(false)
    },
    /* 刷新 */
    onRefresh() {
      this.currentPage = 1
      this.finished = false
      this.getTaskReport(true)
    },

    /* 更多信息 */
    showMoreInfo(item) {
      this.moreInfo = item
      this.moreShow = true
    },

    /* 弹窗关闭 */
    closeDialog() {
      this.moreInfo = {}
      this.moreShow = false
    }
  }
}
</script>

<style scoped lang="scss">
   .recent_test_wrap {
       width: 100%;
       .tips_node {
           font-size: 20px;
           margin: 20px;
           color: #656565;
       }
       .item_node {
           width: 100%;
           height: 100%;
           background-color: #fff;
           box-shadow: 0px 1px 2px #d6d6d6;
           padding: 20px;
           margin: 20px 0;
           .item_nav {
               font-size: 24px;
               color: #656565;
               margin: 8px 0;
               padding: 4px;
               line-height: 28px;
               .btn_complete {
                   font-size: 16px;
                   color: #fff;
                   background-color: #409eff;
                   border: none;
                   padding: 1px;
                   border-radius: 16px;
               }
               .btn_testing {
                   font-size: 16px;
                   color: #fff;
                   background-color: #f5cb87;
                   border: none;
                   padding: 1px;
                   border-radius: 16px;
               }
           }
           .more_node {
               cursor: pointer;
               color: #409eff;
           }
           .item_title {
               font-size: 28px;
               color: #383838;
           }
       }
       .title_node {
           width: 100%;
           height: 120px;
           font-size: 32px;
           text-align: center;
           color: #fff;
           background: url("../../../assets/images/bg_header.png");
           background-size: 100% 100%;
       }
       .body_wrap {
           padding: 20px;
           ul {
               list-style: none;
               li {
                   color: #909090;
                   font-size: 20px;
                   margin: 8px;
               }
           }
           .close_node {
               height: 60px;
               margin: 20px auto 0;
               line-height: 60px;
               .van-button--round {
                   height: 100%;
                   font-size: 24px;
               }
           }
       }
   }

</style>
<style>
    .recent_test_wrap .van-popup{
        width: 480px;
        border-radius: 10px;
        background-color: #fff;
    }
</style>
