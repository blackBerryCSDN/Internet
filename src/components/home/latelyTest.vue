<template>
  <div class="lately-test">
    <van-pull-refresh
      v-model="taskQuery.isLoading"
      success-text="刷新成功"
      @refresh="onRefresh">
      <van-list
        v-model="taskQuery.loading"
        :finished="taskQuery.finished"
        :offset="1"
        :immediate-check="false"
        @load="onLoadList"
        finished-text="已全部加载完成"
      >
        <div :key="index" v-for="(item, index) in taskList">
          <div class="item-bar">
            <van-row>
              <van-col span="24">
                <div class="title">【{{index}}】【{{item.sceneCode.match(/FZ$/) != null ? '仿真':'无线'}}】{{ item.taskName }}</div>
              </van-col>
              <van-row style="margin-bottom: 10px">
                <van-col span="12">
                  <div class="left">
                    下达人: {{item.assigner}}
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="right">
                    执行方式: {{item.testModeName}}
                  </div>
                </van-col>
              </van-row>
              <van-col span="12">
                <div class="left">
                  状态: {{item.statuStr}}
                </div>
              </van-col>
              <van-col span="12">
                <div style="text-align: right">
                  <van-button size="small" round class="report-btn" @click="showDialog(item)">测试报告</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
          <!--<div>-->
            <!--<div >&lt;!&ndash;【{{item.sceneCode.match(/FZ$/) != null ? '仿真':'无线'}}】&ndash;&gt;{{index}}{{ item.taskName }}</div>-->
          <!--</div>-->
          <!--<van-row>-->
            <!--<van-col span="12">下达人: {{item.assigner}}</van-col>-->
            <!--<van-col span="12">执行方式: {{item.testModeName}}</van-col>-->
            <!--<van-col span="12">状态: {{item.statuStr}}</van-col>-->
            <!--<van-col span="12">-->
              <!--<van-button size="small" round class="report-btn" @click="showDialog()">测试报告</van-button>-->
            <!--</van-col>-->
          <!--</van-row>-->
        </div>
        <!--<div style="height:60px;" :key="index" v-for="(item,index) in taskList">
          <div >{{index}}、{{item.taskName}}</div>
        </div>-->
      </van-list>
    </van-pull-refresh>

    <van-dialog
      v-model="testDialog"
      z-index="99999"
      theme="round-button"
      confirmButtonColor="#0198FA"
      class="test-dialog"
    >
      <testReport v-if="testDialog" :report-params="reportParams"/>
    </van-dialog>
  </div>
</template>

<script>
import testReport from './test-report'
import {getTaskInfoList} from '@/api/app/addTask'

export default {
  name: 'SubLatelyTest',
  components: {
    testReport
  },
  props: {
    sceneCode:{
      type:String,
      default(){
        return ''
      }
    }
  },
  data() {
    return {
      testDialog: false,
      taskList:[],
      taskQuery:{
        pageSize:10,
        pageNo:1,
        finished:false,
        isLoading:false,
        loading:false,
        likeSceneCode:this.sceneCode
      },
      reportParams: {}
    }
  },
  created(){
    console.log(this.sceneCode)
    // this.getData()
    this.onRefresh()
  },
  mounted() {
  },
  methods: {
    /* 测试报告弹窗打开 */
    showDialog(item) {
      const info = JSON.parse(JSON.stringify(item))
      this.reportParams = {}
      this.reportParams.taskId = info.taskId
      this.reportParams.taskName = info.taskName
      this.reportParams.sceneCode = info.sceneCode
      this.reportParams.testStartTime = info.assignTimeStr
      this.reportParams.description = info.description
      this.testDialog = true
    },
    getData(){
      getTaskInfoList(this.taskQuery).then(res=>{
        this.taskList = res.data.list
        this.taskQuery.loading = false
        this.taskQuery.isLoading = false
      })
    },
    onRefresh(){
      this.taskQuery.pageNo = 1
      this.taskQuery.finished = false
      this.getData()
    },
    onLoadList() {
      this.taskQuery.pageNo++
      // this.taskQuery.pageSize = 1
      getTaskInfoList(this.taskQuery).then(res=>{
        if (res.data.total <= this.taskList.length) {
          this.taskQuery.finished = true
        }else{
          res.data.list.forEach(item=>{
            this.taskList.push(item)
          })
        }
        this.taskQuery.loading = false
        // this.taskQuery.isLoading = false
      })
      // this.taskList.push(JSON.parse(JSON.stringify(this.taskList[0])))
      // this.taskQuery.loading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.item-bar {
    padding: 20px;
    margin: 0px 0px 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px #ddd;
    .title {
      font-weight: bold;
      color: #383838;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .left {
      color: #909090;
    }
    .right {
      color: #909090;
      text-align: right;
    }
    .report-btn {
    background: linear-gradient(to right, #0183FE, #00B0F6);
    color: #fff;
    padding: 0px 20px;
    height: 44px;
    font-size: 20px;
  }
  }
.van-overlay{
  height: 100vh;
}
.test-dialog {
  position: fixed;
  width: 84%;
  top: 40%;
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
</style>
