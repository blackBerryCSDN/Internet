<template>
    <div class="statistics_test_wrap">
        <div class="select_node">
            <van-dropdown-menu active-color="#409eff">
                <van-dropdown-item v-model="timeType" @change="timeChange(timeType)" :options="timeTypeOption" />
                <van-dropdown-item v-model="sumKey" @change="cityChange(sumKey)" :options="sumKeyOption" />
            </van-dropdown-menu>
        </div>
        <div class="table_node">
            <table cellspacing="0" class="table">
                <tr>
                    <th v-for="(item, index) in tableHead" :key="index">{{ item.label }}</th>
                </tr>
                <tr v-for="(item, index) in tableData" :key="index">
                    <td v-for="(context, i) in tableHead" :key="i">{{ item[context.prop] }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { getVoiceSumReport } from '@/api/voice/voice'
export default {
  name: 'StatisticsTest',
  data() {
    return {
      timeType: 0,
      sumKey: 'localAttachCityCode',
      timeTypeOption: [
        { text: '最近三天', value: 0 },
        { text: '最近七天', value: 1 },
        { text: '最近三月', value: 2 }
      ],
      sumKeyOption: [
        { text: '呼出地', value: 'localAttachCityCode' },
        { text: '呼入地', value: 'otherAttachCityCode' }
      ],
      tableData: [],
      // th
      tableHead: [
        {
          label: '呼出地',
          prop: 'cityName'
        },
        {
          label: '拨号时延(s)',
          prop: 'avgDelay'
        },
        {
          label: '单通率(%)',
          prop: 'singlePassRate'
        },
        {
          label: '话音比例(%)',
          prop: 'oRefSpeechRate'
        },
        {
          label: '信号衰减',
          prop: 'signalAttenuation'
        },
        {
          label: '吞字掉话',
          prop: 'dropRate'
        },
        {
          label: '平均mos评分',
          prop: 'mosScore'
        },
        {
          label: '平均匹配度(%)',
          prop: 'matchDegree'
        }
      ]
    }
  },
  created() {
    this.getVoiceSumReport()
  },
  methods: {
    /* 时间选择 */
    timeChange(e) {
      this.getVoiceSumReport()
    },

    /* 地市选择 */
    cityChange(e) {
      if (e === 'otherAttachCityCode') {
        this.tableHead[0].label = '呼入地'
      } else {
        this.tableHead[0].label = '呼出地'
      }
      this.getVoiceSumReport()
    },
    getVoiceSumReport() {
      const params = {}
      params.timeType = this.timeType
      params.sumKey = this.sumKey
      getVoiceSumReport(params).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.statistics_test_wrap {
    .select_node {
        margin-bottom: 20px;
    }
    .table_node {
        font-size: 20px;
        width: 100%;
        margin-bottom: 15px;
        overflow-y: hidden;
        text-align: center;
        background-color: #fff;
        .table {
            width: 100%;
            max-width: 100%;
            th {
                border: none!important;
                background-color: #409eff;
                color: #fff;
                line-height: 45px;
                word-break: keep-all;white-space:nowrap;
                height: 45px;
                padding: 6px;
            }
            td {
                word-break: keep-all;
              white-space:nowrap;
                padding: 10px;
            }
        }
    }
}
</style>
<style>
    .van-dropdown-menu__bar {
        padding: 4px 0;
    }
    .van-dropdown-menu__title {
        font-size: 24px;
        line-height: 24px;
    }
    .van-cell {
        padding: 16px 6px;
    }
</style>
