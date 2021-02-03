<template>
  <div>
    <div class="tab-bar">
      <div
        class="item"
        v-for="(item, index) in menuArr"
        :key="index"
        :class="{ active: index === $store.state.app.menuActiveIndex }"
        >
        <div @click="changeMenuPath(item, index)" class="item-div" style="position: relative;" >
            <i class="iconfont" :class="item.icon"></i>
            <span class="icon-tip" v-if="index === 1" style="">{{ $store.state.app.alarmTotal }}</span>
        </div>
        <div @click="changeMenuPath(item, index)" class="item-div">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data: function() {
    return {
      name: 'tabbar',
      menuArr: [
        { icon: 'iconshouye', name: '首页', path: '/home' },
        { icon: 'icongaojing', name: '告警', path: '/alarm' },
        { icon: 'iconguanyu', name: '关于', path: '/about' }
      ],
      activeMenu: 0
    }
  },
  mounted() {

  },
  methods: {
    changeMenuPath(item, index) {
      this.$store.state.app.menuActiveIndex = index
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  background: #fff;
  display: flex;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0px;
  z-index: 9;
  width: 100%;
  padding-top: 16px;
  .item {
    flex: 1;
    text-align: center;
    color: #9C9C9C;
    transition: 0.3s all ease;
    height: 80px;
    .item-div{
      height: 40px;
      font-size: 22px;
      .icon-tip{
        padding:2px;
        position:absolute;
        left: 50%;
        margin-left: -5px;
        top: -0px;
        z-index: 2;
        background: red;
        border-radius: 50%;
        min-width: 26px;
        transform: scale(0.7);
        color: #fff;
      }
      .iconfont{
        font-size: 36px;
      }
    }
  }
  .item.active{
    color: #30AAFA;
    font-weight: bold;
  }
}
</style>
