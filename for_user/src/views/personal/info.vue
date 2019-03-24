<template>
  <div class="info">
    <v-header title="个人信息"></v-header>
    <md-field class="field" title="个人信息">
      <div class="action-container" slot="action" @click="onClick">
        修改 <md-icon name="rectangle"></md-icon>
      </div>
      <md-input-item
        type = "text"
        title="所属部门"
        name="department"
        v-model=form.department
        clearable
        disabled
      ></md-input-item>
      <md-input-item
        type = "text"
        title="教师编号"
        name="teacher_id"
        v-model=form.teacher_id
        clearable
        disabled
      ></md-input-item>

      <md-input-item
        type = "text"
        title="教师姓名"
        name="teacher_name"
        v-validate="'required'"
        data-vv-validate-on="input"
        v-model=form.teacher_name
        :error="errors.first('teacher_name')"
        clearable
        :disabled=disable
      ></md-input-item>

      <input-validate
        type="phone"
        title="联系电话"
        name="tel"
        placeholder="输入联系电话"
        v-validate="'required|tel'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :propValue=form.tel
        :error="errors.first('tel')"
        :disabled=disable
      ></input-validate>

      <input-validate
        type="number"
        title="薪资卡号"
        name="payment_card"
        placeholder="输入银行卡号"
        v-validate="'required|numeric'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :propValue=form.payment_card
        :error="errors.first('payment_card')"
        :disabled=disable
      ></input-validate>
      
      <div v-show=showupDate class="btn-group">
        <md-button @click="reset"  round size="small">取消</md-button>
        <md-button @click="submit" type="primary" round size="small">提交</md-button>
      </div>
        
    </md-field>

    <div v-show=!showupDate class="btn-group">
      <md-button type="primary" round size="small">修改密码</md-button>
      <md-button @click="logout" type="warning" round size="small">退出登录</md-button>
    </div>
  </div>
</template>

<script>
import {Field, FieldItem, Dialog, Icon, ActionBar, Toast, InputItem, Button} from 'mand-mobile'
import { Validator } from "vee-validate"
import input_validate from '@/components/input_validate.vue'

Validator.extend("tel", {
  getMessage: field => `${field} value do not meet right format`,
  validate: value => /^1[34578][0-9]{9}$/.test(value)
})

export default {
  name: 'field-demo',

  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [ActionBar.name]: ActionBar,
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    'input-validate':input_validate
  },

  data() {
    return {
      open: false,
      form:{
        department:'',
        teacher_name:'',
        teacher_id:'',
        tel:'',
        payment_card:''
      },
      disable:true,
      showupDate:false
    }
  },

  methods: {
    getData(){
      let user_info = JSON.parse(localStorage.getItem('user_info'))
      this.form = JSON.parse(localStorage.getItem('user_info'))
    },
    onClick() {
      this.showupDate = true
      this.disable = false
    },
    handleClick() {
      Toast.succeed('Click')
    },
    reset(){
      this.showupDate = false
      this.disable = true
      console.log(this.form)
      this.form = JSON.parse(localStorage.getItem('user_info'))
      console.log(JSON.parse(localStorage.getItem('user_info')))
    },
    submit(){

    },
    logout(){
      this.Bmob.User.logout()
    }
  },
  mounted () {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
.info{
  width: 100%;
  .md-action-bar{
    bottom: 1rem;
  }
  .field{
    padding-top: 1.5rem;
    .action-container{
      font-size: 0.4rem;
    }
    .btn-group{
      margin: 0;
    }  
  }
  .btn-group{
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    width:100%;
    padding: 0 15%;
    box-sizing: border-box;
    display: flex;
    button{
      margin: 0.5rem;
    }
  }
}
</style>
<style>
/* fix mand-mobile actionBar bug */
.md-button-content{
  margin:1px;
}
</style>


