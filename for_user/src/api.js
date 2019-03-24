let api = {}

// 用户接口
let _User = '_User'
api.user = {
  login (self,data) {
    return self.Bmob.User.login(data.name,data.pass)
  },
  getUsers (self) {
    return self.Bmob.Query(_User).find()
  },
  register(self,data){
    return self.Bmob.User.register(data)
  },
  getMoreExists(self, data, start, end) {
    let q = self.Bmob.Query(_User)
    for (let key in data) {
      q.containedIn(key, data[key])
    }
    if (start || end) {
      q.skip(start)
      q.limit(end - start)
    }
    return q.find()
  },
  getCurrentInfo(self){
    return self.Bmob.User.current()
  }
}

// 课酬相关接口
let payment = 'payment'
api.payment = {
  getOne(self,objectId){
    let q = self.Bmob.Query(payment)
    return q.get(objectId)
  },
  getMoreExists(self, data, start, end) {
    let q = self.Bmob.Query(payment)
    for (let key in data) {
      q.containedIn(key, data[key])
    }
    if (start || end) {
      q.skip(start)
      q.limit(end - start)
    }
    return q.find()
  },
  update(self,teacher_id,data){
    let q = self.Bmob.Query(payment)
    q.set('id', teacher_id)
    for (let key in data) {
      q.set(key, data[key])
    }
    return q.save()
  }
}

// 教学任务相关接口
let teachingTask = 'teachingTask'
api.teachingTask = {
  getMoreExists(self, data, start, end) {
    let q = self.Bmob.Query(teachingTask)
    for (let key in data) {
      q.containedIn(key, data[key])
    }
    if (start || end) {
      q.skip(start)
      q.limit(end - start)
    }
    return q.find()
  }
}

export default api