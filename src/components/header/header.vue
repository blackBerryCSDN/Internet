<template>
  <div class="nav-header">
    <div class="nav-item item-back">
      <div v-if="back.show">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </div>
    </div>
    <div class="nav-item item-title">
      <div v-if="title.show">
        {{title.text}}
      </div>
    </div>
    <div class="nav-item item-menu">
      <div v-if="menu.show" class="alarm-menu">
        <van-icon name="chat-o" @click="goAlalr()" :badge="$store.state.app.alarmTotal" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    back: {
      type: Object,
      default() {
        return {
          icon: '',
          show: false
        }
      }
    },
    title: {
      type: Object,
      default() {
        return {
          text: '首页',
          show: true
        }
      }
    },
    menu: {
      type: Object,
      default() {
        return {
          opera: '',
          show: false
        }
      }
    }
  },
  data() {
    return {
      name: `header`
    }
  },
  mounted() {
  },
  methods: {
    goAlalr() {
      this.$router.push({
        path: '/alarm'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-header {
  position: fixed;
  height: 90px;
  top: 0px;
  width:100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: #fff;
  background: linear-gradient(to right, #017ffe, #00b4f5) ;
  .nav-item{
    align-items: center;
    display: flex;
    height: 90px;
    flex: 1;
  }

  .item-back{
    padding: 0px 10px;
    font-size: 28px;
    //background: green;
  }
  .item-title{
    justify-content: center;
    font-size: 34px;
    //background: red;
  }
  .item-menu{
    padding: 20px 10px;
    text-align: right;
    justify-content: flex-end;
    .alarm-menu{
      padding: 0px 20px;
      padding-top: 15px;
      font-size: 24px;
    }
  }
}
</style>
