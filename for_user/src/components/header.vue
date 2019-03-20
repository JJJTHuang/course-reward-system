<template>
  <div class="header">
    <!-- <md-icon class="router_back" name="arrow-left" size="lg" @click="back"></md-icon> -->
    <div class="title">{{title}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon } from "mand-mobile";

export default {
  data() {
    return {};
  },
  props: {
    title: String
  },
  components: {
    [Icon.name]: Icon,
  },
  methods: {
    back(){
      this.$router.back()
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 1rem;
  widows: 100%;
  // background-color: #2f86f6;
  text-align: center;
  border-bottom: solid 1px #e2e4ea;
  .router_back {
    float: left;
    height: 1rem;
    line-height: 1rem;
  }
  .title {
    color: #2f86f6;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
  }
}
</style>
