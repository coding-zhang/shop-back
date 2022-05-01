<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {initDynamicRoutes} from '@/router'

export default {
  name: "App",
  components: {
    
  },
  created(){
    initDynamicRoutes()
  }
};
</script>

<style lang="scss">

</style>
