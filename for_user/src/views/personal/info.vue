<template>
  <div class="info">
    <v-header title="个人信息"></v-header>
    <md-field title="个人信息">
      <md-field-item solid title="所属部门" content="中药学院" />
      <md-field-item solid title="姓名" content="王祖蓝" />
      <md-field-item solid title="联系电话" content="18990090181" disabled/>
      <md-field-item solid title="工资卡" content="4430 xxxx xxxx 8998" disabled/>
      <md-field-item solid title="动作条目" arrow @click="onClick" />
      <p class="footer" slot="footer" v-show=false>
        <md-action-bar :actions="data"></md-action-bar>
      </p> 
    </md-field>
  </div>
</template>

<script>
import {Field, FieldItem, Dialog, Icon, ActionBar, Toast} from 'mand-mobile'

export default {
  name: 'field-demo',

  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [ActionBar.name]: ActionBar
  },

  data() {
    return {
      open: false,
      data: [
        {
          text: '次要按钮',
          onClick: this.handleClick,
        },
        {
          text: '主要按钮',
          onClick: this.handleClick,
        },
      ],
    }
  },

  methods: {
    onClick() {
      Dialog.alert({
        content: '点击了',
      })
    },
    handleClick() {
      Toast.succeed('Click')
    },
  },
}

</script>

<style lang="scss" scoped>
.md-action-bar{
  bottom: 1rem;
}
</style>
<style>
/* fix mand-mobile actionBar bug */
.md-button-content{
  margin:1px;
}
</style>


