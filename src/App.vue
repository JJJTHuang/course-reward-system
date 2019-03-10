<template>
  <div id="app">
    <!-- <div class="request-loading" :class="{'request-loading-show' : requestLoading}">
      <div class="loading-module"></div>
    </div> -->
    <div v-loading.fullscreen.lock="requestLoading"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      fullscreenLoading: false
    }
  },
  components: {},
  created () {},
  computed: {
    ...mapGetters([
      'requestLoading'
    ]),
  }
}
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
}
</style>
