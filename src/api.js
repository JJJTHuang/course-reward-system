import {apiError} from './api_error.js'

let api = {}

// 用户接口
api.user = {
  login (self,data) {
    return self.Bmob.User.login(data.name,data.pass)
  }
}

// 接口响应成功，报错误码
api.error = (self, err) => {
  apiError(self, err)
}

export default api