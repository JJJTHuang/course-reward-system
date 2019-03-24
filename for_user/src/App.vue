<template>
  <div id="app">
    <!-- <div class="mask" v-show="true">
      <md-icon class="spinner" :svg=false name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {Icon} from 'mand-mobile'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    [Icon.name]: Icon,
  },
  created () {
    this.$router.push({path:'/'})
  },
  computed: {
    ...mapGetters([
      'requestLoading'
    ]),
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/reset.scss';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  .mask{
    position:absolute;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    // background: rgba(0,0,0,0.1);
    opacity: 0.2;
    @include mix-flex;
    z-index: -100;
    .spinner{
      font-size: 100rem;
      z-index: 100;
      opacity: 1;
    }
  }
}
</style>
