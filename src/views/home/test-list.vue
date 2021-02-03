<template>
  <div>
    <nav-header :back="backObj" :title="titleObj"/>
    <div class="layout-body-top">
      <div class="search-top_com">
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
      </div>
      <div class="result-body">
        <div class="test-list_com">
          <div style="height: 10px;"></div>
          <div v-if="loading" class="loading-box">
            <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
          </div>
          <lately-test :test-data="testData"/>
        </div>
      </div>
    </div>

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
import navHeader from '@/components/header/header'
import latelyTest from '@/components/home/latelyTest'
import {parseTime} from '@/utils'
import {getTaskInfoList} from '@/api/app/addTask'

export default {
  name: 'TestList',
  components: {
    navHeader,
    latelyTest
  },
  data() {
    return {
      name: `test-list`,
      titleObj: {
        show: true,
        text: '任务列表'
      },
      backObj: {
        show: true
      },
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
      // 测试结果数据
      testData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = []
      this.loading = true
      setTimeout(() => {
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
