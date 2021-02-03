<template>
  <div>
      <nav-header />
      <div class="layout-body-all">
        <div class="business-list">
          <ul class="business-ul">
            <li
              class="li-item"
              :key=index
              v-for="(item, index) in businessArr"
              @click="itemClick(item)"
            >
              <div class="icon-div" :style="{background: item.color}">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <div class="name-div">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>

        <div class="alarm-box">
          <div class="title">
            <span class="text">最近TOP5活动告警</span>
            <span class="right-more" @click="showAlarmInfo()">更多</span>
          </div>
          <div>
              <div v-if="loading" class="loading-box">
                  <van-loading type="spinner" color="#1989fa" vertical>加载中...</van-loading>
              </div>
              <list-item :specialSize="5" />
          </div>
        </div>
      </div>
      <nav-footer/>
    <router-view />
  </div>

</template>

<script>
import navFooter from '@/components/tabbar/tabbar'
import navHeader from '@/components/header/header'
import listItem from '@/components/alarm/alarm-item'
import {getAlarmCount} from '@/api/app/alarm'

export default {
  name: 'Home',
  components: {
    listItem,
    navFooter,
    navHeader
  },
  data() {
    return {
      activeIndex: '',
      businessArr: [
        {
          name: '日常测试',
          icon: 'iconceshi',
          color: '#ED3E69',
          type:'every',
          id: 0
        },
        {
          name: '业务开通',
          icon: 'iconyewu',
          color: '#439EFF',
          type:'business',
          id: 1
        },
        {
          name: '割接测试',
          icon: 'iconlianjie',
          color: '#F8A407',
          type:'cutover',
          id: 2
        },
        {
          name: '投诉验证',
          icon: 'iconyanzhengyanzhengma',
          color: '#3BCEA8',
          type:'identify',
          id: 3
        }
      ],
      // 加载
      loading: false,
    }
  },
  created(){
    getAlarmCount({sceneCodes:'ROUTINE_FZ,ROUTINE_COM'}).then(res=>{
      this.$store.state.app.alarmTotal = res.data
    })
  },
  mounted() {
  },
  methods: {
    itemClick(item) {
      this.$router.push({
        path: '/home/sub',
        query: {
          type: item.type
        }
      })
    },
    // 更多告警
    showAlarmInfo() {
      this.$router.push({
        path: '/alarm'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .layout-body-all{
    //font-size: 16px;
  }

  // 测试任务
  .business-list{
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 0px 10px #ddd;
    padding: 30px 28px;
    // 业务类型
    .business-ul{
      width: 100%;
      margin: 0px;
      padding: 0px;
      display: flex;
      .li-item{
        width: 25%;
        text-align: center;
        .icon-div{
          margin: 0px auto;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          line-height: 100px;
          text-align: center;
          .iconfont{
            font-size: 50px;
            color: #fff;
          }
        }
      }

      .li-item:active{
        background: #efefef;
      }
      .name-div{
        margin-top: 18px;
        color: #454545;
        font-weight: 500;
      }
    }
  }

  // 告警列表
  .alarm-box{
    margin: 15px 0px;
    .title{
      padding: 20px 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;
      .text{
        flex: 1;
      }
      .right-more{
        padding-right: 5px;
        flex: 1;
        color: #00b3f5;
        text-align: right;
      }
    }
  }

  // 告警弹框
  .alarm-dialog{

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
