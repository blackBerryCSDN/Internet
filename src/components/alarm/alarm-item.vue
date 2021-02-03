<template>
  <div>
    <div>
      <van-pull-refresh
        v-model="isRefresh"
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
          <div v-for="(item,index) in alarmList" :key="index">
            <div class="item-bar">
              <van-row style="margin-bottom: 10px">
                <van-col span="12">
                  <div class="name">
                    {{item.warnTypeName}}
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="time">
                    {{item.inTimeStr}}
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="12" >
                  <div class="level">
                    告警级别：{{item.levelStr}}
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="details">
                    <span @click="showDetailsDialog(item)">详细</span>
                  </div>
                </van-col>
                <!--<van-col span="12">{{item.levelStr}}</van-col>-->
                <!--<van-col span="12">{{item.levelStr}}</van-col>-->
                <!--<van-col span="12">{{item.levelStr}}</van-col>-->
                <!--<van-col span="12">{{item.levelStr}}</van-col>-->
              </van-row>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <div v-if="alarmList.length == 0">当前没有告警</div>
    </div>
    <!--<ul class="alarm-ul_com">
      <li
        class="item-li"
        :key="index"
        v-for="(item, index) in alarmData">
        <div class="name-title">
          <span class="name">{{item.name}}</span>
          &nbsp; - &nbsp;
          <span class="date">{{item.date}}</span>
        </div>
        <div class="text-info">
          {{item.text}}
        </div>
        <div class="details">
          <span class="right-more" @click="showDetailsDialog()">详细</span>
        </div>
      </li>
    </ul>-->

    <van-dialog
      v-model="alarmDialog"
      theme="round-button"
      confirmButtonColor="#0198FA"
      class="alarm-dialog"
    >
      <div class="dia-header">
        <span>告警详情</span>
        <span class="float-right" @click="closeDialog()">
          <van-icon name="cross" />
        </span>
      </div>
      <div class="dia-body">
        <div class="list-div">
          <div class="circle-box">
            <span class="circle-span"></span>
          </div>
          <div class="text">
            终端：{{alarmItemInfo.localTsName}}
          </div>
        </div>
        <div class="list-div">
          <div class="circle-box">
            <span class="circle-span"></span>
          </div>
          <div class="text">
            地市：{{alarmItemInfo.localCityName}}
          </div>
        </div>
<!--        <div class="list-div">-->
<!--          <div class="circle-box">-->
<!--            <span class="circle-span"></span>-->
<!--          </div>-->
<!--          <div class="text">-->
<!--            网元：{{alarmItemInfo.net}}-->
<!--          </div>-->
<!--        </div>-->
        <div class="list-div">
          <div class="circle-box">
            <span class="circle-span"></span>
          </div>
          <div class="text">
            时间：{{alarmItemInfo.inTimeStr}}
          </div>
        </div>
        <div class="list-div">
          <div class="circle-box">
            <span class="circle-span"></span>
          </div>
          <div class="text">
            告警内容：{{alarmItemInfo.alarmNote}}
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { parseTime,parseDate } from '@/utils'
import {getAlarmList} from '@/api/app/alarm'
export default {
  name: 'ListItem',
  props: {
    specialSize: {
      type: Number,
      default: function() {
        return 0
      }
    }
  },
  data() {
    return {
      // 告警信息
      alarmItemInfo: {
        terminal: '终端1',
        city: '宁波',
        net: 'JTNET1',
        time: '2020-19-10 16:12:30',
        content: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次'
      },
      // 告警弹框
      alarmDialog: false,
      isRefresh:false,
      loading:false,
      finished:false,
      query:{
        currentPage:1,
        pageSize:10,
        warnDeal:0,
        sceneCodes:"ROUTINE_FZ,ROUTINE_COM",
        // times:[parseTime(new Date(new Date().getTime() - 30*24*60*60*1000)),parseTime(new Date())]
        times:[parseTime(new Date(2019,8,21)),parseTime(new Date(2019,9,21))]
      },
      alarmList:[]
    }
  },
  created(){
    if (this.specialSize > 0) {
      this.query.pageSize = this.specialSize
    }
    this.onRefresh()
  },
  methods: {
    // 告警详细
    showDetailsDialog(item) {
      console.log(item)
      this.alarmItemInfo = item
      this.alarmDialog = true
    },
    closeDialog() {
      this.alarmDialog = false
    },
    onRefresh(){
      this.query.currentPage = 1
      this.finished = false
      getAlarmList(this.query).then(res=>{
        this.alarmList = res.data.items
        console.log(this.alarmList, 88888)
        this.isRefresh = false
      })
    },
    onLoadList(){
      this.query.currentPage ++
      getAlarmList(this.query).then(res=>{
        res.data.items.forEach(item=>{
          this.alarmList.push(item)
        })
        if (this.alarmList.length >= res.data.totalNum) {
          this.finished = true
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-dialog{
  width: 84%;
  top: 40%;
  .dia-header{
    padding: 10px;
    text-align: center;
    height: 164px;
    color: #fff;
    background: url("../../assets/images/home/dia-top-bg.png") no-repeat 100% 100%;
    .float-right{
      float: right;
      padding: 5px  10px;
    }
  }
  .dia-body{
    padding: 15px 20px;
    font-size: 22px;

    .list-div{
      display: flex;
      padding: 6px 15px;
      .circle-box{
        width: 30px;
        height: 30px;
        text-align: center;
        .circle-span{
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
      .text{
        width: calc(100% - 30px);
        color: #909090;
      }
    }

    .list-div:nth-child(1) {
      .circle-span{background: #0198fa;}
    }
    .list-div:nth-child(2) {
      .circle-span{background: #EA6368;}
    }
    .list-div:nth-child(3) {
      .circle-span{background: #24BC72;}
    }
    .list-div:nth-child(4) {
      .circle-span{background: #F3D825;}
    }
    .list-div:nth-child(5) {
      .circle-span{background: #6D63EA;}
    }
  }
}
 /* .alarm-ul_com{
  padding: 0px;
  margin: 0px;
  background: #FFFFFF;
  .item-li{
    padding: 20px;
    list-style: none;
    margin-bottom: 10px;
    box-shadow: 0px 0px 5px #ddd;

    .name-title{
      padding-bottom: 10px;
      .name{
        font-weight: bold;
        color: #383838;
      }
      .date{
      }
    }

    .text-info{
      //font-size: 16px;
      line-height: 1.5;
      color: #787777;
    }

    .details{
      color: #00b3f5;
      text-align: right;
      //font-size: 14px;
    }
  }
  // 点击后的效果
  .activeLi{
    background: #efefef;
  }
  .item-li:active{
    background: #f5f5f5;
  }
}*/
.item-bar {
  padding: 20px;
  margin: 0px 0px 10px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px #ddd;

  .name {
    font-weight: bold;
    color: #383838;
  }

  .time {
    color: #909090;
    text-align: right;
  }

  .level {
    color: #909090;
  }

  .details {
    color: #409eff;
    text-align: right;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
