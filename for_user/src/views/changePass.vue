<template>
  <div class="changePass">
    <v-header :routerback=true title="修改密码"></v-header>
    <div class="form">
      <md-field>
        <md-input-item
          type="password"
          title="新密码"
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
          title="确认新密码"
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
          placeholder="输入联系电话"
          v-validate="'required|tel'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('tel')"
        ></input-validate>

        <md-input-item
          title="验证码"
          name="number"
          placeholder="输入验证码"
          v-validate="'required|numeric'"
          data-vv-validate-on="input"
          :error="errors.first('number')"
        >
        </md-input-item>

      </md-field>
    </div>
    <div class="btn-group">
      <md-button round type="primary" size="small" @click="reg" inline>提交</md-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
        password: "",
        confirmpass:'',
        tel: ""
      }
    };
  },
  methods: {
    clear() {
      
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
}
</script>

<style lang="scss" scoped>
.changePass {
  width: 100%;
  .form{
    padding-top: 2rem;
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
