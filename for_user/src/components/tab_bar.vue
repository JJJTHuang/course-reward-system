<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-4">
    <md-tab-bar v-model="current" :items="items" :has-ink="false" @change="change">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon"/>
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>
import { TabBar, Icon } from "mand-mobile";

export default {
  name: "tab-bar-demo",
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      current: 1,
      items: [
        { name: 1, label: "课酬", icon: "home", path: { name: "payment" } },
        { name: 2, label: "课程", icon: "calendar", path: { name: "course" } },
        { name: 3, label: "申改", icon: "setting", path: { name: "apply" } },
        { name: 4, label: "个人", icon: "user", path: { name: "info" } }
      ]
    };
  },
  methods: {
    change(item, index, prevIndex) {
      this.$router.push(item.path);
    }
  }
};
</script>
<style scoped>
</style>
