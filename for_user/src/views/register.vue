<template>
  <div class="login_form">
    <v-header title="注册"></v-header>
    <div class="form">
      <md-field>
        <md-input-item
          title="用户名"
          name="username"
          v-model=form.username
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
          v-model=form.password
          placeholder="输入密码"
          v-validate="'required|min:6'"
          data-vv-validate-on="input"
          :error="errors.first('password')"
          clearable
        ></md-input-item>

        <md-input-item
          type="password"
          title="确认密码"
          name="confirmpass"
          v-model=form.comfirmpass
          placeholder="再次输入密码"
          v-validate="{'required': 'true', 'is': form.password}"
          data-vv-validate-on="input"
          :error="errors.first('confirmpass')"
          clearable
        ></md-input-item>

        <input-validate
          type="phone"
          title="联系电话"
          name="tel"
          placeholder="Phone Validate On Blur"
          v-validate="'required|tel'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('tel')"
        ></input-validate>

      </md-field>
    </div>
    <div class="btn-group">
      <md-button type="primary" @click="login" inline plain>去登录</md-button>
      <md-button type="primary" @click="reg" inline plain>注册</md-button>
    </div>
  </div>
</template>

<script>
import { InputItem, Field, Button, Toast } from "mand-mobile"
import { Validator } from "vee-validate"
import input_validate from '@/components/input_validate.vue'

Validator.extend("tel", {
  getMessage: field => `${field} value do not meet right format`,
  validate: value => /^1[34578][0-9]{9}$/.test(value)
})

export default {
  components: {
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Field.name]: Field,
    'input-validate':input_validate
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmpass:'',
        tel: ""
      }
    };
  },
  methods: {
    clear() {
      
    },
    login() {
      this.$router.push({
        name: "login"
      });
    },
    reg() {
      let self = this
      self.$validator.validateAll().then(res=>{
        if(res){
          self.api.user.getMoreExists(self,{username:[self.form.username]}).then(res=>{
            if(res.length>0){
              Toast({
                content: `用户名${self.form.username}已存在`,
                icon: 'warn',
              })
            }else{
              Toast.loading('loading...')
              self.api.user.register(self, self.form).then(res => {
                Toast.hide()
                localStorage.setItem("sessionToken", res.sessionToken);
                localStorage.setItem("objectId", res.objectId);
                self.$router.push({name:'payment'})
              });
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.login_form {
  width: 100%;
  .form{
    margin-top: 1rem;
  }
  .btn-group {
    margin-top: 0.5rem;
    width: 100%;

    .md-button {
      padding: 0 0.5rem;
      margin: 0 0.3rem;
    }
  }
}
</style>
