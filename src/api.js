let api = {}

// 用户接口(管理员，教师)
let _User = '_User'
api.user = {
  login (self,data) {
    return self.Bmob.User.login(data.name,data.pass)
  },
  logout(self){
    return self.Bmob.User.logout()
  },
  register(self,data){
    return self.Bmob.User.register(data)
  },
  getUsers (self) {
    return self.Bmob.Query(_User).find()
  },
  getExists(self,key,arr){
    return getExists(_User,self,key,arr)
  },
  update (self,objId,data) {
    return update(_User,self,objId,data)
  },
  registerMore(self,dataArr){
    const queryArray = new Array();
    // 构造含有50个对象的数组
    dataArr.forEach((item,index)=>{
      var queryObj = self.Bmob.Query('_User')
      for(let key in item){
        queryObj.set(key,item[key])
      }
      queryArray.push(queryObj)
    })
    // 传入刚刚构造的数组
    return self.Bmob.Query('_User').saveAll(queryArray)
  },
  del(self,objId){
    return del(_User,self,objId)
  }
}

// 教学任务接口
let teachingTask = 'teachingTask'
api.teachingTask = {
  getAll(self){
    return getAll(teachingTask,self)
  },
  getLimit(self,start,end){
    return getLimit(teachingTask,self,start,end)
  },
  add(self,data){
    return add(teachingTask,self,data)
  },
  update(self,objId,data){
    return update(teachingTask,self,objId,data)
  },
  del(self,objId){
    return del(teachingTask,self,objId)
  },
  getOne(self,objId){
    return getOne(teachingTask,self,objId)
  },
  getRelation(self,gtable,key,objId){
    return getRelation(teachingTask,self,gtable,key,objId)
  },
  addRelation(self,data){
    return addRelation(self,data.rtable,data.rArr,teachingTask,data.objId,data.key)
  },
  getExists(self,key,val,start,end){
    let q = self.Bmob.Query(teachingTask)
    q.containedIn(key, val)
    q.skip(start)
    q.limit(end-start)
    return q.find()
  },
  getMoreExists(self,data,start,end){
    let q = self.Bmob.Query(teachingTask)
    for(let key in data){
      q.containedIn(key, data[key])
    }
    q.skip(start)
    q.limit(end-start)
    return q.find()
  }
}

// 课程接口
let course = 'course'
api.course = {
  getAll(self){
    return getAll(course,self)
  },
  getOne(self,objId){
    return getOne(course,self,objId)
  },
  getMoreExists(self,data,start,end){
    let q = self.Bmob.Query(course)
    for(let key in data){
      q.containedIn(key, data[key])
    }
    q.skip(start)
    q.limit(end-start)
    return q.find()
  },
  add(self,data){
    return add(course,self,data)
  },
  update(self,objId,data){
    return update(course,self,objId,data)
  },
  del(self,objId){
    return del(course,self,objId)
  }
}

// 学年学期
let semester = 'semester'
api.semester = {
  getAll(self){
    return getAll(semester,self)
  },
  add(self,data){
    return add(semester,self,data)
  }
}

// 院系信息
let department = 'department'
api.department = {
  getAll(self){
    return getAll(department,self)
  },
  add(self,data){
    return add(department,self,data)
  }
}

let getExists = (table,self,key,arr) => {
  let q = self.Bmob.Query(table)
  q.containedIn(key, arr)
  return q.find()
}

let getAll = (table,self) => {
  let q = self.Bmob.Query(table)
  return q.find()
}

let getLimit = (table,self,start,end) => {
  let q = self.Bmob.Query(table)
  q.skip(start)
  q.limit(end-start)
  return q.find()
}

let getOne = (table,self,objId) => {
  let q = self.Bmob.Query(table)
  return q.get(objId)
}

let update = (table,self,objId,data) => {
  let q = self.Bmob.Query(table)
  q.set('id',objId)
  for(let key in data){
    q.set(key,data[key])
  }
  return q.save()
}

let add = (table,self,data) => {
  let q = self.Bmob.Query(table)
  for(let key in data){
    q.set(key,data[key])
  }
  return q.save()
}

let del = (table,self,objId) => {
  let q = self.Bmob.Query(table)
  return q.destroy(objId)
}

let getRelation = (table,self,key,gtable,objId) => {
  let q = self.Bmob.Query(table)
  q.field(key,objId)
  return q.relation(gtable)
}

let addRelation = (self,rtable,rArr,table,objId,key) => {
  let r = self.Bmob.relation(rtable)
  let rId = r.add(rArr)
  return getOne(table,self,objId).then(res => {
    res.set(key,rId)
    res.save()
  })
}

export default api