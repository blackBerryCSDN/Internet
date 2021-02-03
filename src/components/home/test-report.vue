<template>
    <div>
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
            <b style="line-height: 28px;">{{reportParams.taskName}}</b>
          </div>
          <div v-if="reportParams.sceneCode === 'CUTOVER_FZ' || reportParams.sceneCode === 'CUTOVER_COM'">
            <div>割接前： {{geJieBefore}}</div>
            <div>割接后： {{geJieAfter}}</div>
          </div>
        </div>
        <van-tabs @change="changeService"  title-active-color="#00b3f5" color="#00b3f5" line-width="64px" border swipeable animated>
          <van-tab v-for="(service, index) in serviceList" :title="service.serviceName" :key="index">
            <div class="index-box">
              <div class="index-item">
                <div class="list-index">
                  <div v-if="reportParams.sceneCode === 'CUTOVER_FZ' || reportParams.sceneCode === 'CUTOVER_COM'">
                    <van-row>
                      <van-col span="8">
                        <div class="name">指标</div>
                      </van-col>
                      <van-col span="8">
                        <div class="name">割接前</div>
                      </van-col>
                      <van-col span="8">
                        <div class="name">割接后</div>
                      </van-col>
                    </van-row>
                  </div>
                  <div v-else>
                    <van-row>
                      <van-col span="12">
                        <div class="name">指标</div>
                      </van-col>
                      <van-col span="12">
                        <div class="name">数值</div>
                      </van-col>
                    </van-row>
                  </div>
                  <div class="flex-item" :key="index" v-for="(item, index) in reportData[service.serviceType]">
                    <div v-if="reportParams.sceneCode === 'CUTOVER_FZ' || reportParams.sceneCode === 'CUTOVER_COM'">
                      <van-row>
                        <van-col span="8">
                          <div class="label">{{item.normName}}</div>
                        </van-col>
                        <van-col span="8">
                          <div class="value">{{item.normValue_before}}</div>
                        </van-col>
                        <van-col span="8">
                          <div class="value">{{item.normValue_after}}</div>
                        </van-col>
                      </van-row>
                    </div>
                    <div v-else>
                      <van-row>
                        <van-col span="12">
                          <div class="label">{{item.normName}}</div>
                        </van-col>
                        <van-col span="12">
                          <div class="value">{{item.normValue}}</div>
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
    </div>
</template>

<script>
import { getServiceListByTaskId, getAppSumReport } from '@/api/app/report'
export default {
  name: 'TestReport',
  props: {
    reportParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      geJieBefore: '',
      geJieAfter: '',
      serviceList: [], // 业务
      reportData: {}
    }
  },
  created() {
    this.getServiceList()
    if (this.reportParams.description !== null) {
      const split = this.reportParams.description.split('|')
      this.geJieBefore = split[0]
      this.geJieAfter = split[1]
    }
  },
  methods: {
    getServiceList() {
      const taskId = this.reportParams.taskId
      getServiceListByTaskId(taskId).then(res => {
        this.serviceList = res.data
        this.changeService(0)
      })
    },
    /* 业务选择事件 */
    changeService(index) {
      const service = this.serviceList[index]
      let serviceType = ''
      let subServiceType = ''
      let expServiceType = ''
      if (service.serviceType.length === 8) {
        serviceType = service.serviceType.substring(0, 3)
        subServiceType = service.serviceType.substring(3, 5)
        expServiceType = service.serviceType.substring(5, 8)
      } else {
        serviceType = service.serviceType.substring(0, 3)
        subServiceType = service.serviceType.substring(3, 5)
        expServiceType = '0'
      }
      if (!this.reportData[service.serviceType]) {
        const params = {}
        params.sceneCode = this.reportParams.sceneCode
        params.taskId = this.reportParams.taskId
        params.serviceType = serviceType
        params.subServiceType = subServiceType
        params.expServiceType = expServiceType
        params.testStartTime = this.reportParams.testStartTime
        params.description = this.reportParams.description
        getAppSumReport(params).then(res => {
          this.$set(this.reportData, service.serviceType, res.data)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

    .btn-box{
      button{
        //padding: 5px 20px;
        //height: 46px;
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
      .list-index{
        padding: 10px 0px;
        .flex-item{
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
