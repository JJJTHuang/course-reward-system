<template>
  <div class="login_form">
    <div class="form">
    <md-field>
      <md-input-item
        title="用户名"
        type="text"
        v-model="username"
        placeholder="输入用户名"
      ></md-input-item>
      <md-input-item
        title="密码"
        type="password"
        v-model="password"
        @keydown="onInputKeydown"
        @change="onInputChange"
        placeholder="输入密码"
      ></md-input-item>
    </md-field>
    </div>
    <div class="btn-group">
      <md-button type="primary" @click="clear" inline plain>清空</md-button>
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
    onInputKeydown(name, event) {
      console.log(`[Mand Mobile InputItem keydown] ${event.keyCode}`)
    },
    onInputChange(name, value) {
      console.log(`[Mand Mobile InputItem change] ${value}`)
    },
    clear(){
      this.username = ""
      this.password = ""
    },
    login(){
      let self = this
      let userData = {
        name:self.username,
        pass:self.password
      }
      if(userData.name === '' || userData.pass === '') {
        Toast.info('用户名或密码不能为空')
      }else{
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
      }
    }
  },
}

</script>

<style lang="scss" scoped>
.login_form{
  width: 100%;
  margin-top: 2rem;
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
