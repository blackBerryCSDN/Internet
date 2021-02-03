<template>
  <div>
    <nav-header :back="backObj" :title="titleObj" :menu="meunObj"/>
    <div class="layout-body-top">
      <div>
        <van-tabs
          v-model="tabsActive"
          title-active-color="#409eff"
          color="#409eff"
          line-width="100px"
          border
          animated>
          <van-tab title="最近测试"></van-tab>
          <van-tab title="立即测试"></van-tab>
        </van-tabs>
        <!--最近测试-->
        <div v-show="tabsActive === 0">
          <div class="tab-body lately-test">
            <!--<div class="header">
              <span class="text">最近TOP5活动任务</span>
              <span class="right-more" @click="showMoreList()">更多</span>
            </div>-->
            <lately-test :test-data="testData" :sceneCode="sceneCode"/>
          </div>
        </div>
        <!--立即测试-->
        <div v-if="tabsActive === 1">
          <div class="tab-body">
            <promptly-test :sceneCode="sceneCode"/>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import promptlyTest from '@/components/home/sub-promptly-test'
import latelyTest from '@/components/home/latelyTest'
import navHeader from '@/components/header/header'

export default {
  name: 'Subpage',
  components: {
    promptlyTest,
    navHeader,
    latelyTest
  },
  data() {
    return {
      name: `subpage`,
      titleObj: {
        text: '',
        show: true
      },
      backObj: {
        show: true
      },
      meunObj: {
        show: true,
        icon: ''
      },
      sceneCode: '',
      tabsActive: 1,
    }
  },
  created() {
    const query = this.$route.query
    switch (query.type) {
      case 'every':
        this.titleObj.text = '日常测试'
        this.sceneCode = 'ROUTINE'
        break;
      case 'business':
        this.titleObj.text = '业务开通'
        this.sceneCode = 'OPEN'
        break;
      case 'cutover':
        this.titleObj.text = '割接测试'
        this.sceneCode = 'CUTOVER'
        break;
      case 'identify':
        this.titleObj.text = '投诉验证'
        this.sceneCode = 'VERIFY'
        break;
    }
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    // 更多
    showMoreList() {
      this.$router.push({
        path: '/home/list'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.tab-body {
  padding: 10px 0px;
}

.lately-test {
  .header {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;

    .text {
      flex: 1;
    }

    .right-more {
      padding-right: 5px;
      flex: 1;
      color: #00b3f5;
      text-align: right;
    }
  }
}
</style>
