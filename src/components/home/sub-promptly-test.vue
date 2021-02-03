<template>
  <div class="form_node">
    <div>
      <div v-if="step === 1">
        <van-form>
          <!-- 任务名称-->
          <van-field
            v-model="task.taskName"
            name="任务名称"
            label="任务名称"
            placeholder="请输入任务名称"
            :rules="[{ required: true, message: '请填写任务名称' }]"
          />
          <van-field
            v-if="task.ifClientName"
            v-model="task.clientName"
            name="客户名称"
            label="客户名称"
            placeholder="请输入客户名称"
          />
          <van-field
            v-if="task.ifVerify"
            v-model="task.question"
            name="验证问题"
            label="验证问题"
            placeholder="请输入验证问题"
          />
          <van-field
            v-show="task.ifCutTime"
            readonly
            clickable
            name="割接前开始时间"
            v-model="task.cutTimeBeforeStart"
            label="割接前开始时间"
            placeholder="选择时间"
            @click="showTimePicker('cutTimeBeforeStart')"
          />
          <van-field
            v-show="task.ifCutTime"
            readonly
            clickable
            name="割接前结束时间"
            v-model="task.cutTimeBeforeEnd"
            label="割接前结束时间"
            placeholder="选择时间"
            @click="showTimePicker('cutTimeBeforeEnd')"
          />
          <van-field
            v-show="task.ifCutTime"
            readonly
            clickable
            name="割接后开始时间"
            v-model="task.cutTimeAfterStart"
            label="割接后开始时间"
            placeholder="选择时间"
            @click="showTimePicker('cutTimeAfterStart')"
          />
          <van-field
            v-show="task.ifCutTime"
            readonly
            clickable
            name="割接后结束时间"
            v-model="task.cutTimeAfterEnd"
            label="割接后结束时间"
            placeholder="选择时间"
            @click="showTimePicker('cutTimeAfterEnd')"
          />
          <!-- 单张虚卡多终端-->
          <van-field name="单张虚卡多终端" label="单张虚卡多终端" class="switch_node" v-if="sceneCode=='ROUTINE'">
            <template #input>
              <van-switch v-model="task.virtualCardMultiTs" size="20"/>
            </template>
          </van-field>
          <!-- 执行方式-->
          <van-field name="执行方式" label="执行方式">
            <template #input>
              <van-radio-group v-model="task.testMode" direction="horizontal">
                <van-radio name="1">立即</van-radio>
                <van-radio name="2">定时</van-radio>
                <van-radio name="3" v-show="!task.virtualCardMultiTs">例行</van-radio>
                <van-radio name="4" v-show="!task.virtualCardMultiTs">循环</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 优先级-->
          <van-field
            readonly
            clickable
            name="优先级"
            v-model="task.priorityName"
            label="优先级"
            placeholder="点击选择优先级"
            @click="priorityShowPicker = true"
          />
          <!-- 开始时间-->
          <van-field
            v-show="task.testMode !== '1'"
            readonly
            clickable
            name="开始时间"
            v-model="task.startTime"
            label="开始时间"
            placeholder="选择开始时间"
            @click="showTimePicker('startTime')"
          />
          <!-- 结束时间-->
          <van-field
            v-show="task.testMode === '3' || task.testMode === '4'"
            readonly
            clickable
            name="结束时间"
            v-model="task.endTime"
            label="结束时间"
            placeholder="选择结束时间"
            @click="showTimePicker('endTime')"
          />
          <!-- 例行方式-->
          <van-field v-show="task.testMode === '3'" name="例行方式" label="例行方式">
            <template #input>
              <van-radio-group v-model="task.routineMode" direction="horizontal" @change="changeChooseWay">
                <van-radio name="3">按月</van-radio>
                <van-radio name="2">按周</van-radio>
                <van-radio name="1">按天</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 执行时间-->
          <van-field
            v-show="task.testMode === '3' && (task.routineMode === '3' || task.routineMode === '2' )"
            readonly
            clickable
            label="执行时间"
            :value="routineDateLabel"
            placeholder="执行时间"
            @click="showRoutineDateDialog = true"
          />
          <!-- 执行时间点-->
          <van-field
            v-show="task.testMode === '3'"
            readonly
            clickable
            label="执行时间点"
            :value="routineTimeLabel"
            placeholder="执行时间点"
            @click="showRoutineTimeDialog = true"
          />
          <van-field
            v-show="task.testMode === '3'"
            v-model="task.routineMinute"
            label="执行时间点分钟"
            placeholder="执行时间点分钟与执行时间点结合使用"
          />
          <!-- 暂停时段-->
          <van-field
            v-show="task.testMode === '4'"
            readonly
            clickable
            label="暂停时段"
            :value="pauseTimeLabel"
            placeholder="暂停时段"
            @click="showPauseTimeDialog = true"
          />
          <van-field v-show="task.testMode === '4'" name="循环次数" label="循环次数">
            <template #input>
              <van-stepper v-model="task.loopTimes" min="0"/>
            </template>
          </van-field>
          <!-- 任务间隔-->
          <van-field v-show="task.testMode === '3' || task.testMode === '4'" name="任务间隔" label="任务间隔">
            <template #input>
              <van-stepper v-model="task.taskInterval" min="0"/>
            </template>
          </van-field>
          <!-- 单任务时限-->
          <van-field v-show="task.testMode === '3' || task.testMode === '4'" name="单任务时限" label="单任务时限">
            <template #input>
              <van-stepper v-model="task.loopTaskLimit" min="0"/>
            </template>
          </van-field>
          <!-- 下一步-->
        </van-form>
        <div style="margin: 16px;">
          <van-button
            round
            block
            size="small"
            color="linear-gradient(to right, #017efe , #00b6f5)"
            @click="nextStep()">
            下一步
          </van-button>
        </div>
      </div>
      <div v-if="step === 2" style="padding: 5px;">
        <div>
          <van-tabs
            v-model="activeTab"
            title-active-color="#fff"
            title-inactive-color="#00b3f5"
            color="#00b3f5"
            background="#fff"
            line-width="100px"
            type="card">
            <van-tab title="无线测试"></van-tab>
            <van-tab title="仿真测试"></van-tab>
          </van-tabs>
          <!--无线测试-->
          <div v-show="activeTab === 0" style="padding: 0px 10px">
            <!--选择业务-->
            <check-item :serviceDetail="serviceDetail1"/>
          </div>
          <!--仿真测试-->
          <div v-show="activeTab === 1" style="padding: 0px 10px">
            <check-item :serviceDetail="serviceDetail22"/>
          </div>
        </div>
        <div style="margin: 16px;">
          <van-row gutter="20">
            <van-col span="12">
              <van-button
                round
                type="info"
                block
                size="small"
                @click="preStep()">
                上一步
              </van-button>
            </van-col>
            <van-col span="12">
              <van-button
                round
                type="primary"
                block
                size="small"
                @click="toDoTask()">
                下达
              </van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <div
      class="task-box"
      v-if="loading">
      <van-loading size="24px" vertical class="text-load"><span>任务下达中...</span></van-loading>
    </div>

    <van-popup v-model="priorityShowPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="priorityOptions"
        value-key="label"
        :default-index="2"
        @confirm="onConfirm"
        @cancel="priorityShowPicker = false"
      />
    </van-popup>
    <van-popup v-model="ifTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="选择时间"
        v-model="tmpTime"
        @confirm="timePickerConfirm"
        :formatter="formatter"
        @cancel="ifTimePicker = false"
      />
    </van-popup>

    <!--多选测试时间点-->
    <van-popup v-model="showRoutineTimeDialog" round position="bottom" style="height: 400px;">
      <div style="width: 80%;margin: 0px auto;">
        <div style="height: 40px;line-height: 40px;display: flex;justify-content: space-between;">
          <span @click="showRoutineTimeDialog = false">取消</span>
          <span @click="checkAll()">全选</span>
          <span @click="multiTimeOk()">确定</span>
        </div>
        <div style="height: 360px;overflow: auto;">
          <van-checkbox-group v-model="task.routineTimeStamp">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in routineTimeStamp"
                clickable
                :key="item"
                :title="`${item}`"
                @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item" ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

    <!--多选测试时间-->
    <van-popup v-model="showRoutineDateDialog" round position="bottom" style="height: 400px;">
      <div style="width: 80%;margin: 0px auto;">
        <div style="height: 40px;line-height: 40px;display: flex;justify-content: space-between;">
          <span @click="showRoutineDateDialog = false">取消</span>
          <span @click="checkAllDay()">全选</span>
          <span @click="multiDayOk()">确定</span>
        </div>
        <div style="height: 360px;overflow: auto;">
          <van-checkbox-group v-model="task.routineDate">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in routineDate"
                clickable
                :key="item.label"
                :title="`${item.label}`"
                @click="toggleDay(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item.value" ref="checkMonthboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

    <!--暂停时间-->
    <van-popup v-model="showPauseTimeDialog" round position="bottom" style="height: 400px;">
      <div style="width: 80%;margin: 0px auto;">
        <div style="height: 40px;line-height: 40px;display: flex;justify-content: space-between;">
          <span @click="showPauseTimeDialog = false">取消</span>
          <span @click="checkPauseAll()">全选</span>
          <span @click="multiPauseOk()">确定</span>
        </div>
        <div style="height: 360px;overflow: auto;">
          <van-checkbox-group v-model="task.pauseTimeStamp">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in pauseTimeStamp"
                clickable
                :key="item"
                :title="`${item}`"
                @click="togglePause(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item" ref="pauseCheckbox" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { parseTime,parseDate } from '@/utils'
import {getMonthArray,getWeekArray,getHourList,getHourPeriodList,getScene,addTask} from '@/api/app/addTask'

import checkItem from '@/components/home/checkItem'

export default {
  name: 'SubPromptlyTest',
  components: {
    checkItem
  },
  props:{
    sceneCode: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      activeTab: 0,
      step: 1,
      task: {
        virtualCardMultiTs: false,
        taskName: '', // 任务名称
        testMode: '1', // 执行方式
        priority: '3', // 优先级
        priorityName: '高', // 优先级
        clientName: '', // 客户名称
        question: '',
        startTime: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        endTime:'',
        timeRange: '', // 起始时间
        routineDate:[],
        routineTimeStamp:[],
        routineMinute:'0',
        cutTimeBefore: '', // 割接前时间
        cutTimeAfter: '', // 割接后时间
        cutTimeBeforeStart:'',
        cutTimeBeforeEnd:'',
        cutTimeAfterStart:'',
        cutTimeAfterEnd:'',
        stopTime: '', // 暂停时段
        loopTimes: 0, // 循环次数
        routineMode: '1', // 按天
        taskInterval: 0, // 任务间隔
        taskSendInterval: 6, // 虚卡在多终端时，终端任务间隔
        loopTaskLimit: 0, // 单任务时限
        ifCutTime: false, // 判断是否显示割接
        ifVerify: false,
        ifClientName: false // 判断是否显示割接
      },
      priorityOptions: [{value:"1",label:"低"},{value:"2",label:"中"},{value:"3",label:"高"}],
      priorityShowPicker: false,
      ifTimePicker:false,
      showRoutineTimeDialog: false,
      showPauseTimeDialog:false,
      routineTimeLabel: '',
      pauseTimeLabel:'',
      // 多选测试时间
      showRoutineDateDialog: false,
      routineDateLabel: '',
      routineDate: [],
      routineTimeStamp: getHourList(),
      pauseTimeStamp: getHourPeriodList(),
      // 下达加载
      loading: false,
      sceneId1:'',
      sceneId22:'',
      serviceDetail22: [],
      serviceDetail1: [],
      tmpTime:'',
      tmpTimeKey:''
    }
  },
  created(){
    console.log(this.sceneCode,'scenecode')
    if (this.sceneCode === 'ROUTINE') {
      this.task.taskName = '日常测试'
    } if (this.sceneCode === 'OPEN') {
      this.task.taskName = '开通测试'
      this.task.ifClientName = true
    } if (this.sceneCode === 'CUTOVER') {
      this.task.taskName = '割接测试'
      this.task.ifCutTime = true
    } else if (this.sceneCode === 'VERIFY') {
      this.task.taskName = '验证测试'
      this.task.ifVerify = true
    }
    getScene({sceneCode: this.sceneCode+'_FZ'}).then(data => {
      this.serviceDetail22 = JSON.parse(data.data.serviceDetail)
      this.sceneId22 = data.data.id
    })
    getScene({sceneCode: this.sceneCode+'_COM'}).then(data => {
      this.serviceDetail1 = JSON.parse(data.data.serviceDetail)
      this.sceneId1 = data.data.id
    })
  },
  methods: {
    nextStep() {
      this.step = 2
    },
    preStep() {
      this.step = 1
    },
    toDoTask() {
      const serviceDetail22 = JSON.parse(JSON.stringify(this.serviceDetail22))
      const serviceDetail1 = JSON.parse(JSON.stringify(this.serviceDetail1))
      // 去除未勾选的业务
      for (let i = serviceDetail22.length - 1; i >= 0; i--) {
        if (!serviceDetail22[i].checked) {
          serviceDetail22.splice(i, 1)
        }
      }
      for (let i = serviceDetail1.length - 1; i >= 0; i--) {
        if (!serviceDetail1[i].checked) {
          serviceDetail1.splice(i, 1)
        }
      }
      if (this.task.ifClientName) {
        if (!this.task.clientName) {
          Toast.fail("请输入客户名称")
          return
        }
      }
      if (this.task.ifVerify) {
        if (!this.task.question) {
          Toast.fail("请输入验证问题")
          return
        }
      }
      if (this.task.ifCutTime) {
        if (!this.task.cutTimeBeforeStart || !this.task.cutTimeBeforeEnd || !this.task.cutTimeAfterStart || !this.task.cutTimeAfterEnd) {
          Toast.fail("请选择割接时间")
          return
        }
      }
      if (serviceDetail1.length == 0 && serviceDetail22.length == 0) {
        Toast.fail("请至少选择一个业务测试")
        return
      }
      this.loading = true
      addTask({task: this.task, sceneId1: this.sceneId1, sceneId22: this.sceneId22, serviceDetail22: serviceDetail22, serviceDetail1: serviceDetail1}).then(data => {
        this.loading = false
        Toast.fail("下达成功")
      }).catch(error => {
        this.loading = false
        Toast.fail("下达失败")
      })

    },
    // 优先级
    onConfirm(obj) {
      this.task.priority = obj.value
      this.task.priorityName = obj.label
      this.priorityShowPicker = false
    },
    timePickerConfirm(time){
      this.task[this.tmpTimeKey] = parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
      this.ifTimePicker = false
    },
    // 日期格式化
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      } else if (type === 'second') {
        return `${val}秒`
      }
      return val
    },
    // 执行时间点
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    togglePause(index) {
      this.$refs.pauseCheckbox[index].toggle()
    },
    multiTimeOk() {
      this.showRoutineTimeDialog = false
      this.routineTimeLabel = this.task.routineTimeStamp.join(',')
    },
    multiPauseOk() {
      this.showPauseTimeDialog = false
      this.pauseTimeLabel = this.task.pauseTimeStamp.join(',')
    },
    checkAll() {
      this.task.routineTimeStamp = this.task.routineTimeStamp.length === this.routineTimeStamp.length ? [] : this.routineTimeStamp
    },
    checkPauseAll() {
      this.task.pauseTimeStamp = this.task.pauseTimeStamp.length === this.pauseTimeStamp.length ? [] : this.pauseTimeStamp
    },
    // 执行时间
    changeChooseWay(val) {
      this.routineDate = []
      this.task.routineDate = []
      this.routineDateLabel = ''
      if (val === '2') {
        this.routineDate = getWeekArray()
      } else if (val === '3') {
        this.routineDate = getMonthArray()
      }
    },
    // 执行时间
    toggleDay(index) {
      this.$refs.checkMonthboxes[index].toggle()
    },
    checkAllDay() {
      if (this.routineDate.length != this.task.routineDate.length) {
        this.task.routineDate = []
        this.routineDate.forEach(item=>{
          this.task.routineDate.push(item.value)
        })
      }else{
        this.task.routineDate = []
      }
    },
    multiDayOk() {
      this.showRoutineDateDialog = false
      const labels = []
      this.routineDate.forEach(item=>{
        if (this.task.routineDate.indexOf(item.value) > -1) {
          labels.push(item.label)
        }
      })
      this.routineDateLabel = labels.join(",")
    },
    showTimePicker(key){
      this.tmpTimeKey = key
      if (this.task[key]) {
        this.tmpTime = parseDate(this.task[key])
      }else{
        this.tmpTime = parseDate(parseTime(new Date()))
      }
      this.ifTimePicker = true
    }
  },
  watch:{
    task:{
      handler (nv, ov) {
        console.log(JSON.stringify(nv))
      },
      deep: true
    },
    'task.virtualCardMultiTs': {
      handler (nv, ov) {
        console.log(nv)
        if (nv) {
          this.task.testMode = '1'
        } else {

        }
      }
    },
  }
}
</script>


<style lang="scss" scoped>
.switch_node .van-field__label {
  width: 28%;
}

.van-field__label {
  width: 20%;
}

.task-box{
  position: fixed;
  top: 0px;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, .7);
  text-align: center;
  .text-load{
    margin-top: 80%;
    color: #fff;
    span{
      color: #fff;
    }
  }
}
</style>
