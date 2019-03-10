<template>
<div class="page">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        name: 'test',
        pass: '123456'
      },
      rules: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        name: [{
          validator: checkname,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.api.user.login(self, self.ruleForm).then(res => {
            localStorage.setItem('sessionToken', res.sessionToken)
            if (localStorage.sessionToken) {
              self.$router.push({
                name: 'index'
              })
            }
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    // if (localStorage.sessionToken) {
    //   this.$router.push({
    //     name: 'index'
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100%;
  @include mix-flex;

  .ruleForm {
    width: 500px;
  }
}
</style>
