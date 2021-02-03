<template>
  <div class="lately-test">
    <div class="test-list_com">
      <div
        :key="index"
        v-for="(item, index) in testData"
        class="test-item">
        <div class="title-top">
          <div class="title">【{{ item.type }}】{{ item.name }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <van-row class="row-box">
          <van-col span="8">下达人: 8</van-col>
          <van-col span="8" align="center">业务数量: 8</van-col>
          <van-col span="8" align="right">状态: 8</van-col>

          <van-col span="8">终端数量: 8</van-col>
          <van-col span="8" align="center">执行方式: 8</van-col>
          <van-col span="8" align="right">优先级: 8</van-col>

          <van-col span="8">终端数量: 8</van-col>
          <van-col span="16" align="right">
            <van-button size="small" round class="report-btn" @click="showDialog()">测试报告</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-dialog
      v-model="testDialog"
      z-index="99999"
      theme="round-button"
      confirmButtonColor="#0198FA"
      class="test-dialog"
    >
      <div class="dia-header">
        <span>测试报告</span>
        <div class="btn-box" align="right" style="padding: 10px 0px">
          <br>
          <br>
<!--          <van-button type="primary" size="mini">选择指标</van-button>-->
        </div>
      </div>
      <div class="dia-body">
        <div class="report-title" align="center">
          <div>
            <b style="line-height: 28px;">{{testReportName}}</b>
          </div>
          <div v-if="sceneCode === 'CUTOVER'">
            <div>割接前： 2020-01-15 00:00:00~2020-01-16 00:00:00</div>
            <div>割接后： 2020-01-16 00:01:00~2020-01-17 00:00:00</div>
          </div>
        </div>
        <van-tabs @click="onClick"  title-active-color="#00b3f5" color="#00b3f5" line-width="64px" border swipeable animated>
          <van-tab v-for="(item, index) in testReportTask" :title="item.name" :key="index">
            <div class="index-box">
              <div class="index-item">
                <div class="list-index">
                  <div class="flex-item" :key="index" v-for="(item, index) in testReport">
                    <div v-if="sceneCode === 'CUTOVER'">
                      <van-row>
                        <van-col span="8">
                          <div class="name">指标</div>
                          <div class="label" v-for="(itemName, index) in item.nameArr" :key="index">{{itemName.name}}</div>
                        </van-col>
                        <van-col span="8">
                          <div class="name">割接前</div>
                          <div class="value" v-for="(itemBefore, index) in item.valueBeforeArr" :key="index">{{itemBefore.value}}</div>
                        </van-col>
                        <van-col span="8">
                          <div class="name">割接后</div>
                          <div class="value" v-for="(itemAfter, index)  in item.valueAfter" :key="index">{{itemAfter.value}}</div>
                        </van-col>
                      </van-row>
                    </div>
                    <div v-else>
                      <van-row>
                        <van-col span="12">
                          <div class="name">指标</div>
                          <div class="label" v-for="(itemName, index) in item.nameArr" :key="index">{{itemName.name}}</div>
                        </van-col>
                        <van-col span="12">
                          <div class="name">数值</div>
                          <div class="value" v-for="(itemSon, index) in item.valueArr" :key="index">{{itemSon.value}}</div>
                        </van-col>
                      </van-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'SubLatelyTest',
  props: {
    testData: {
      type: Array,
      default: () => {
        return []
      }
    },
    sceneCode: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      testDialog: false,
      testReportName: '割接测试_202001151328540008',
      testReportTask: [
        { name: '网页浏览' },
        { name: '网络质量' },
        { name: '游戏质量' },
        { name: '视频播放' },
        { name: '文件下载' },
        { name: '宽带拨号' },
        { name: '业务体验' }
      ], // 业务
      testReport: [
        {
          nameArr: [
            { name: '承载建立时延' },
            { name: '承载删除时延' },
            { name: '承载建立成功率' },
            { name: '承载建立时延' },
            { name: '承载删除时延' },
            { name: '承载建立成功率' },
            { name: '承载删除成功率' }
          ],
          valueBeforeArr: [
            { value: '12.89ms' },
            { value: '23.6m0ms' },
            { value: '97.45%' },
            { value: '12.89ms' },
            { value: '23.6m0ms' },
            { value: '97.45%' },
            { value: '100.00%' }
          ],
          valueAfter: [
            { value: '18.19ms' },
            { value: '20.35ms' },
            { value: '96.49%' },
            { value: '18.19ms' },
            { value: '20.35ms' },
            { value: '96.49%' },
            { value: '100.00%' }
          ],
          valueArr: [
            { value: '12.89ms' },
            { value: '23.6m0ms' },
            { value: '97.45%' },
            { value: '12.89ms' },
            { value: '23.6m0ms' },
            { value: '97.45%' },
            { value: '100.00%' }
          ]
        }
      ]
    }
  },
  mounted() {
    // this.receiveCode = this.sceneCode
  },
  methods: {
    /* 测试报告弹窗关闭 */
    closeDialog() {
      this.testDialog = false
    },
    /* 测试报告弹窗打开 */
    showDialog() {
      this.testDialog = true
      console.log(this.sceneCode)
      switch (this.sceneCode) {
        case 'ROUTINE':
          this.testReportName = '日常测试_202001151328540008'
          break
        case 'OPEN':
          this.testReportName = '业务开通_202001151328540008'
          break
        case 'CUTOVER':
          this.testReportName = '割接测试_202001151328540008'
          break
        case 'VERIFY':
          this.testReportName = '投诉验证_202001151328540008'
          break
      }
    },
    /* 业务点击事件 */
    onClick(name, title) {
      console.log(title)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-overlay{
  height: 100vh;
}
.test-dialog {
  position: fixed;
  width: 90%;
  top: 40%;
  .dia-header{
    padding: 10px;
    text-align: center;
    height: 100px;
    color: #fff;
    background: url("../../assets/images/home/test-report-top.png") no-repeat;
    background-size: 100% 100%;

    .float-right{
      float: right;
      padding: 5px  10px;
    }
  }
  .dia-body {
    padding: 15px 20px;
    font-size: 22px;

    .report-title {
      margin-bottom: 20px;
    }

    .btn-box{
      button{
        //padding: 5px 20px;
        //height: 46px;
      }
    }
  }
}

.test-list_com {
  .test-item {
    border-bottom: 1px solid #ddd;
    padding: 20px 20px;
    box-shadow: 0px 2px 10px #efefef;
  }

  .title-top {
    display: flex;
    align-items: center;

    .title {
      width: calc(100% - 210px);
      color: #383838;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: -10px;
    }

    .date {
      text-align: right;
      width: 215px;
      color: #939393;
      font-size: 22px;
    }
  }

  .row-box {
    padding: 10px 0px 0px;
    color: #939393;
    font-size: 22px;

    .report-btn {
      background: linear-gradient(to right, #0183FE, #00B0F6);
      color: #fff;
      padding: 0px 20px;
      height: 44px;
      font-size: 20px;
    }
  }
}
// 指标样式
.index-box{
  padding: 10px 0px;
  .index-item{
    background: url('./../../assets/images/home/test-index-bg.png') repeat-y;
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
    /*height: 480px;*/
    .list-index{
      padding: 10px 0px;
      /*display: flex;*/
      /*flex-wrap: wrap;*/
      .flex-item{
        /*width: calc(25% - 20px);*/
        padding: 0px 10px;
        text-align: center;
        font-size: 20px;
        .name{
          font-weight: bold;
          font-size: 22px;
        }
        .label{
          line-height: 22px;
          padding: 10px 0;
          margin-bottom: 5px;
          border-top: 1px solid #fff;
        }
        .value {
          line-height: 22px;
          padding: 10px 0;
          margin-bottom: 5px;
          border-top: 1px solid #fff;
        }
        .label:last-child, .value:last-child{
          margin-bottom: 0px;
        }
      }
    }
  }
  .index-item:last-child{
    margin-bottom: 0px;
  }
}
</style>
