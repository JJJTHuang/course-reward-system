<template>
  <div class="page">
    <div class="md-example-child md-example-child-field md-example-child-field-0">
      <md-field title="王祖蓝,您好">
        <div class="action-container" slot="action" @click="onClick">操作
          <md-icon name="rectangle"></md-icon>
        </div>
        <md-field-item solid title="个人信息" arrow @click="go('info')"/>
        <md-field-item solid title="薪酬申改" arrow @click="go('apply')"/>
      </md-field>
    </div>
  </div>
</template>

<script>
import { Field, FieldItem, Dialog, Icon } from "mand-mobile";

export default {
  data() {
    return {};
  },
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
  },
  methods: {
    onClick() {
      Dialog.alert({
        content: "点击了"
      });
    },
    go(name){
      this.$router.push({name})
    }
  }
};
</script>

<style lang="scss" scoped>
.md-example-child-field-0 {
  .md-field-action {
    height: 36px;
    align-items: flex-end;
    .action-container {
      display: flex;
      align-items: center;
      .md-icon {
        margin-left: 10px;
        color: #c5cad5;
        font-size: 16px;
        width: auto;
        height: auto;
        line-height: normal;
      }
    }
  }
}
.md-field-brief {
  text-align: left;
}
</style>
