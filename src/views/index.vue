<template>

</template>

<script>
  export default {
    name: 'index.vue',
    created(){
      if (config.access == 'voice') {
        this.$router.push({
          path: '/voice'
        })
      }else{
        this.$router.push({
          path: '/home'
        })
      }
    }
  }
</script>

<style scoped>

</style>
