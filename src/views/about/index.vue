<template>
  <div>
    <nav-header :title="titleInfo"/>
    <div class="layout-body-all">
      <div class="about_node">
        <div class="banner_node">
          <van-image class="people_img" fit="contain" :src=people_img />
          <van-image class="bottom_img" fit="contain" :src=bottom_img />
        </div>
        <div class="cell_node">
          <van-cell-group>
          <!--<van-cell is-link>-->
          <!--  <template #title>-->
          <!--    <i class="iconfont iconshezhi" style="margin-right: 5px;color: #0194fa"></i>-->
          <!--    <span class="custom-title">设置</span>-->
          <!--  </template>-->
          <!--</van-cell>-->
          <!--<van-cell is-link>-->
          <!--  <template #title>-->
          <!--    <i class="iconfont iconmima" style="margin-right: 5px;color: #f82341"></i>-->
          <!--    <span class="custom-title">修改密码</span>-->
          <!--  </template>-->
          <!--</van-cell>-->
            <van-cell value="V1.0">
              <template #title>
                <i class="iconfont iconbanben" style="margin-right: 5px;color: #9e1ef7"></i>
                <span class="custom-title">版本</span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
        <div class="btn_node">
          <van-button color="linear-gradient(to right, #017efe , #00b6f5)" @click="goToPath()" round block>退出登录</van-button>
        </div>
      </div>
    </div>
    <nav-footer/>
  </div>
</template>

<script>
import navFooter from '@/components/tabbar/tabbar'
import navHeader from '@/components/header/header'
export default {
  name: 'Index',
  components: {
    navFooter,
    navHeader
  },
  data() {
    return {
      titleInfo: {
        show: true,
        text: '关于'
      },
      people_img: require('../../assets/images/people.png'),
      bottom_img: require('../../assets/images/about_bg.png')
    }
  },
  mounted() {
  },
  methods: {
    goToPath() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .about_node {
    width: 100%;
    .top_node {
      width: 100%;
      height: 96px;
      font-size: 32px;
      background-image: linear-gradient(to right, #017efe , #00b6f5);
      color: #fff;
      text-align: center;
      line-height: 96px;
    }
    .banner_node {
      width: 100%;
      height: 320px;
      background-image: linear-gradient(to right, #017efe , #00b6f5);
      position: relative;
      .people_img {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        margin-left: -60px;
        top: 20%;
      }
      .bottom_img {
        width: 720px;
        height: 62px;
        position: absolute;
        bottom: -20px;
      }
    }
    .btn_node {
      width: calc(100% - 40px);
      height: 64px;
      padding: 0 20px;
      margin: 80px auto;
      font-size: 24px;
      line-height: 64px;
      .van-button--round {
        height: 100%;
      }
    }
  }
</style>
<style>
  .cell_node .van-cell {
    height: 80px;
    font-size: 24px;
    padding: 0 20px;
    line-height: 80px;
  }
  .van-cell__right-icon {
    font-size: 18px;
    line-height: 80px;
  }
</style>
