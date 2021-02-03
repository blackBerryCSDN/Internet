<template>
    <div class="promptly_test_node">
        <div class="body_node">
            <!--任务下达-->
            <div class="test_node">
                <div class="city_node" v-for="(item, index) in serviceDetail" :key="index">
                    <span @click="selectCity(index,'local')" class="left_node">{{item.localCityName}}</span>
                    <van-image class="img_node" fit="contain" :src=point_img />
                    <span @click="selectCity(index,'other')" class="right_node">{{item.otherCityName}}</span>
                    <i @click="deleteTest(index)" class="iconfont icon_delete" :class="item.ico"></i>
                </div>
                <van-popup v-model="showPicker" round position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="allowCitys"
                            value-key="cityName"
                            @cancel="showPicker = false"
                            @confirm="onConfirm"
                    />
                </van-popup>
                <div class="net_node">
                    <van-dropdown-menu active-color="#409eff">
                        <van-dropdown-item v-model="localNet" :options="nets" />
                        <van-dropdown-item v-model="otherNet" :options="nets" />
                    </van-dropdown-menu>
                </div>
                <div class="submit_node">
                    <van-button color="#409eff" round block @click="addTask">立即测试</van-button>
                </div>
            </div>
            <!--历史数据-->
            <!--<div class="history_node" id="history">
                <div @click="fillCity(item.name)" class="item_history" v-for="(item, index) in historyList" :key="index">{{item.name}}</div>
                <div class="clear_history" @click="clearHistory" v-if="historyList.length != 0">清除历史</div>
            </div>-->
        </div>
    </div>
</template>

<script>
import {getAllowCitys,addTask} from '@/api/voice/voice'

export default {
  name: 'PromptlyTest',
  data() {
    return {
      point_img: require('../../../assets/images/point.png'),
      cityIndex: null,
      roleType: null,
      serviceDetail:[{localCityCode:'',localCityName:'地市',otherCityCode:'',otherCityName:'地市'}],
      allowCitys:[],
      showPicker: false,
      localNet: '2G',
      otherNet: '2G',
      nets:[
        { text: '2G', value: '2G' },
        { text: '4G', value: '4G' },
      ],
      historyList: [
        { name: '宁波---湖州' },
        { name: '杭州---湖州' },
        { name: '杭州---湖州' },
        { name: '杭州---宁波' }
      ]
    }
  },
  created(){
    getAllowCitys().then(res=>{
      console.log(JSON.stringify(res.data))
      this.allowCitys = res.data
    })
  },
  methods: {
    /* 选择地市 */
    onConfirm(value,index) {
      this.serviceDetail[this.cityIndex][this.roleType+'CityCode'] = this.allowCitys[index].cityCode
      this.serviceDetail[this.cityIndex][this.roleType+'CityName'] = this.allowCitys[index].cityName
      this.showPicker = false
    },
    selectCity(cityIndex, roleType) {
      this.cityIndex = cityIndex
      this.roleType = roleType
      this.showPicker = true
    },

    /* 清除历史 */
    /*clearHistory() {
      while (this.historyList.length > 0) {
        this.historyList.splice(0, 1)
      }
    },*/

    /* 删除地市 */
    deleteTest(index) {
      this.serviceDetail.splice(index, 1)
    },

    /* 历史数据快捷填入 */
    /*fillCity(obj) {
      this.cityList[this.cityList.length - 1].leftCiyt = obj.slice(0, 2)
      this.cityList[this.cityList.length - 1].rightCiyt = obj.slice(5)
    },*/
    addItem() {
      if (this.serviceDetail.length < 5) {
        this.serviceDetail.push({localCityCode:'',localCityName:'地市',otherCityCode:'',otherCityName:'地市',ico: 'iconshanchu'})
      }
    },
    addTask() {
      const task = {}
      task.net = this.localNet+','+this.otherNet
      task.serviceDetail = this.serviceDetail
      console.log(JSON.stringify(this.serviceDetail))
      addTask(task).then(res=>{
        this.$toast({
          type: 'success',
          message: '任务已下达',
          position: 'top'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.promptly_test_node {
    width: 100%;
    .body_node {
        height: 100%;
        background-color: #fff;
        padding: 20px;
        .test_node {
            padding: 0 36px;
            .city_node {
                width: 100%;
                height: 90px;
                border-bottom: 1px solid #ddd;
                line-height: 90px;
                position: relative;
                .left_node {
                    font-size: 40px;
                    font-weight: 600;
                    float: left;
                }
                .img_node {
                    width: 48px;
                    height: 48px;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-top: -24px;
                    margin-left: -24px;
                }
                .right_node {
                    font-size: 40px;
                    font-weight: 600;
                    float: right;
                }
                .icon_delete {
                    color: #409eff;
                    position: absolute;
                    font-size: 28px;
                    right: -40px;
                }
            }
            .net_node {
                width: 100%;
                height: 90px;
                line-height: 90px;
            }
            .submit_node {
                height: 64px;
                margin: 0 auto;
                line-height: 64px;
                .van-button--round {
                    height: 100%;
                    font-size: 24px;
                }
            }
        }
        .history_node {
            width: 100%;
            height: 100%;
            display: -webkit-box;
            -webkit-box-orient: horizontal;
            margin-top: 10px;
            .item_history {
                -webkit-box-flex:1;
                font-size: 20px;
                color: #656565;
                line-height: 40px;
            }
            .clear_history {
                font-size: 20px;
                color: #656565;
                line-height: 40px;
                position: relative;
                right: 0;
            }
        }
    }
}
</style>
<style>
    .net_node .van-dropdown-menu__bar {
        height: 90px;
        padding: 0;
        position: relative;
        /*font-size: 28px;*/
        box-shadow: 0 0 0 0 rgba(100,101,102,.12);
    }
    .net_node .van-dropdown-menu__bar .van-dropdown-menu__item:first-child {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -14px;
    }
    .net_node .van-dropdown-menu__bar .van-dropdown-menu__item:last-child {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -14px;
    }
    .net_node .van-ellipsis {
        text-align: left;
    }
    .net_node .van-dropdown-menu__title {
        font-size: 28px;
        line-height: 28px;
    }
    .test_node .van-picker__cancel, .van-picker__confirm {
        font-size: 28px;
    }
    .test_node .van-picker-column__item {
        font-size: 28px;
    }
</style>
