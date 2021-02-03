<template>
  <div>
    <nav-header :title="titleObj"/>
    <div class="layout-body-top">
      <!--<div class="search-top_com">
        <van-row>
          <van-col span="10" class="col-padding">
            <van-field
              readonly
              clickable
              label=""
              class="reset-picker"
              :value="alarmState"
              placeholder="选择任务状态"
              @click="showPicker = true"
            />
          </van-col>
          <van-col span="12" class="col-padding">
            <van-field
              readonly
              clickable
              label=""
              class="reset-picker"
              :value="startTOEndTime"
              placeholder="选择起止时间"
              @click="showStartTime = true"
            />
          </van-col>
          <van-col span="2" class="search-box">
            <van-icon name="search" @click="getData()" class="search-btn"/>
          </van-col>
        </van-row>
      </div>-->
      <br>
      <div>
        <div v-if="loading" class="loading-box">
          <van-loading type="spinner" color="#1989fa" vertical>加载中...</van-loading>
        </div>
        <list-item v-else :alarm-data="alarmData"/>
      </div>
    </div>
    <nav-footer/>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCityCancel()"
      />
    </van-popup>

    <van-popup v-model="showStartTime" round position="bottom">
      <van-datetime-picker
        v-model="startDate"
        type="date"
        title="选择开始日期"
        :formatter="formatter"
        @confirm="confirmDateOk"
        @cancel="onCancel('start')"
      />
    </van-popup>
    <van-popup v-model="showEndTime" round position="bottom">
      <van-datetime-picker
        v-model="endDate"
        type="date"
        title="选择结束日期"
        :formatter="formatter"
        @confirm="confirmDateEndOk"
        @cancel="onCancel('end')"
      />
    </van-popup>
  </div>
</template>

<script>
import navFooter from '@/components/tabbar/tabbar'
import navHeader from '@/components/header/header'
import listItem from '@/components/alarm/alarm-item'

import {parseTime} from '@/utils/index'

export default {
  name: 'Index',
  components: {
    listItem,
    navFooter,
    navHeader
  },
  data() {
    return {
      // header 显示
      titleObj: {
        show: true,
        text: '告警'
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      // 开始结束日期
      startDate: new Date(),
      endDate: new Date(),
      // 日期显示文本
      startTOEndTime: '',
      // 加载
      loading: false,
      // 地市选择值
      alarmState: '',
      showPicker: false,
      columns: ['全部', '完成'],
      // 开始结束日期显示
      showStartTime: false,
      showEndTime: false,
      startTime: '',
      endTime: '',
      // 告警数据
      alarmData: []
    }
  },
  mounted() {
    this.$store.state.app.menuActiveIndex = 1
    this.getData()
  },
  methods: {
    getData() {
      this.alarmData = []
      this.loading = true
      setTimeout(() => {
        this.alarmData = [
          {
            name: '网页访问连续失败告警',
            date: '2020-09-08 12:30:21',
            text: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超 标一般告警,cmhk',
            id: 0
          },
          {
            name: '网页访问连续失败告警',
            date: '2020-09-08 12:30:21',
            text: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超 标一般告警,cmhk',
            id: 0
          },
          {
            name: '网页访问连续失败告警',
            date: '2020-09-08 12:30:21',
            text: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超 标一般告警,cmhk',
            id: 0
          },
          {
            name: '网页访问连续失败告警',
            date: '2020-09-08 12:30:21',
            text: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超 标一般告警,cmhk',
            id: 0
          },
          {
            name: '网页访问连续失败告警',
            date: '2020-09-08 12:30:21',
            text: '连续超标一般告警,cmhkwebtest--网页浏览,网页主要展现时延(40.54)连续超标1次.连续超 标一般告警,cmhk',
            id: 0
          }
        ]
        this.loading = false
      }, 500)
    },
    // 地市弹框确定
    onConfirm(value) {
      this.alarmState = value
      this.showPicker = false
    },
    // 开始日期确认
    confirmDateOk() {
      this.startTime = parseTime(this.startDate, '{y}-{m}-{d}')
      this.showStartTime = false
      this.showEndTime = true
    },
    // 结束日期确认
    confirmDateEndOk() {
      this.endTime = parseTime(this.endDate, '{y}-{m}-{d}')
      this.showEndTime = false
      this.startTOEndTime = this.startTime + '至' + this.endTime
    },
    // 地市选择取消
    onCityCancel() {
      this.alarmState = ''
      this.showPicker = false
    },
    // 日期选择取消
    onCancel(type) {
      if (type === 'start') {
        this.showStartTime = false
      } else {
        this.showEndTime = false
      }

      this.startTOEndTime = ''
    },
    // 日期格式化
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
  }
}
</script>

<style lang="scss" scoped>
.reset-picker {
  height: 50px;
  padding: 5px 10px;
  text-align: center;
  border-radius: 10px;
}

.reset-picker /deep/ .van-field__control:read-only {
  text-align: center;
}

.loading-box {
  min-height: 100px;
  text-align: center;
  margin: 150px auto;
}

</style>
