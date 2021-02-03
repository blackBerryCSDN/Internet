<template>
  <div>
    <div>
      <div class="name-label">
        <span>业务</span>
        <van-button round size="small" @click="checkAll()">
          全选
        </van-button>
        <van-button round size="small" @click="toggleItem()">
          反选
        </van-button>
      </div>
      <!--<ul v-for="(item,index) in serviceDetail">-->
        <!--<li class="van-cell__title"><van-checkbox v-model="item.checked">{{item.serviceName}}</van-checkbox></li>-->
      <!--</ul>-->

      <van-checkbox-group v-model="checkedItem" ref="boxgroup">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in serviceDetail"
            clickable
            size="mini"
            :key="item.serviceType"
            :title="`${item.serviceName}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item.serviceType" ref="itembox"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'checkItem.vue',
    props:{
      serviceDetail: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data(){
      return {
        checkedItem:[]
      }
    },
    created(){
      this.serviceDetail.forEach(item=>{
        if(item.checked){
          this.checkedItem.push(item.serviceType)
        }
      })
    },
    methods:{
      toggle(index){
        this.$refs.itembox[index].toggle()
        this.serviceDetail[index].checked = ! this.serviceDetail[index].checked
      },
      checkAll(){
        this.$refs.boxgroup.toggleAll(true)
        this.serviceDetail.forEach(item=>{
          item.checked = true
        })
      },
      toggleItem(){
        this.$refs.boxgroup.toggleAll()
        this.serviceDetail.forEach(item=>{
          item.checked = !item.checked
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .van-cell {
    padding: 10px 10px;
    font-size: 22px;
  }

  .name-label {
    margin-top: 10px;
    padding: 16px;
    font-size: 24px;
    font-weight: bold;
    line-height: 30px;
    background-color: #fff;
  }
</style>
