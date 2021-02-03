<template>
  <div>
    <nav-header :title="titleObj"/>
    <div style="background: red;">
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
            <span>{{item.alarmNote}}</span>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <nav-footer/>
  </div>
</template>

<script>
  import navFooter from '@/components/tabbar/tabbar'
  import navHeader from '@/components/header/header'
  import { parseTime,parseDate } from '@/utils'
  import {getAlarmList} from '@/api/app/alarm'

  export default {
    name: 'index2.vue',
    components: {
      navFooter,
      navHeader
    },
    data(){
      return {
        titleObj: {
          show: true,
          text: '告警'
        },
        isRefresh:false,
        loading:false,
        finished:false,
        query:{
          currentPage:1,
          pageSize:10,
          warnDeal:0,
          sceneCodes:"ROUTINE_FZ,ROUTINE_COM",
          times:[parseTime(new Date(new Date().getTime() - 30*24*60*60*1000)),parseTime(new Date())]
        },
        alarmList:[{alarmNote:'hello'}]
      }
    },
    created(){
      this.onRefresh()
    },
    methods:{
      onRefresh(){
        this.query.currentPage = 1
        this.finished = false
        getAlarmList(this.query).then(res=>{
          // this.alarmList = res.data.items
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

<style scoped>

</style>
