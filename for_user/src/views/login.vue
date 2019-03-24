<template>
  <div class="login_form">
    <v-header title="登录"></v-header>
    <div class="form">
    <md-field>
      <md-input-item
          type="text"
          title="用户名"
          name="username"
          v-model=username
          placeholder="输入用户名"
          v-validate="'required'"
          data-vv-validate-on="input"
          :error="errors.first('username')"
          clearable
        ></md-input-item>

        <md-input-item
          type="password"
          title="密码"
          name="password"
          v-model=password
          placeholder="输入密码"
          v-validate="'required|min:6'"
          data-vv-validate-on="input"
          :error="errors.first('password')"
          clearable
        ></md-input-item>
    </md-field>
    </div>
    <div class="btn-group">
      <md-button type="primary" @click="reg" inline plain>去注册</md-button>
      <md-button type="primary" @click="login" inline>登陆</md-button>
    </div>
  </div>
</template>

<script>
import {InputItem, Field, Button , Toast} from 'mand-mobile'

export default {
  components: {
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Field.name]: Field,
  },
  data() {
    return {
      password: '',
      username: '',
    }
  },
  methods: {
    login(){
      let self = this
      let userData = {
        name:self.username,
        pass:self.password
      }
      self.$validator.validateAll().then(res=>{
        if(res){
          Toast.loading('loading...')
          self.api.user.login(self, userData).then(res => {
            localStorage.setItem('sessionToken', res.sessionToken)
            if (localStorage.sessionToken) {
              Toast.hide()
              self.$router.push({
                name: 'payment'
              })
            }
          }).catch(() => {})
        }else{
          Toast({
              content: `请输入正确的用户名和密码`,
              icon: 'warn',
            })
        }
      })
    },
    reg(){
      this.$router.push({name:'register'})
    }
  },
}

</script>

<style lang="scss" scoped>
.login_form{
  width: 100%;
  .form{
    padding-top: 2rem;
  }
  .btn-group{
    margin-top:0.5rem;
    width: 100%;
    .md-button{
      padding:0 0.5rem;
      margin: 0 0.3rem;
    }
  }
}
</style>
