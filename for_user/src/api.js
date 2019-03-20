let api = {}

// 用户接口
api.user = {
  login (self,data) {
    return self.Bmob.User.login(data.name,data.pass)
  },
  getUsers (self) {
    return self.Bmob.Query('_User').find()
  }
}


export default api