<template>
<div class="home">
  <v-header></v-header>
  <v-navbar class='main-left'></v-navbar>
  <el-main class="main-right">
    <router-view></router-view>
  </el-main>
</div>
</template>

<script>
import navbar from '../components/navbar'
import header from '../components/header'
export default {
  name: 'index',
  components: {
    'v-navbar':navbar,
    'v-header':header
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  .main-left{
    float: left;
  }
  .main-right{
    padding: 40px;
    padding-top: 10px;
  }
}
</style>

