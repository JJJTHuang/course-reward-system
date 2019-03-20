<template>
  <div class="page">
    <el-breadcrumb separator="/">
      <!-- :to="{ path: `/${item}` }" -->
      <el-breadcrumb-item v-for="(item,index) in nav_path" :key=index>{{match(item)}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      pathMatch:{
        '/':'首页',
        'teachingTask':'教学任务',
        'ct':'大学城校区',
        'zs':'中山校区',
        'yf':'云浮校区',
        'cg':'赤岗校区',
        'teacherInfo':'教师信息',
        'summarizing':'汇总',
        'remuneration':'课酬管理',
        'personal':'个人工作量',
        'course':'课程管理',
        'dataIO':'数据导入导出'
      },
      nav_path:[]
    }
  },
  props:{
    path:String
  },
  methods: {
    match(path){
      return this.pathMatch[path]
    }
  },
  mounted () {
    this.nav_path = this.path.split('/').filter(item => {if(item!== '') return item})
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
    height: 50px;
    line-height: 50px;

    .el-breadcrumb__item:first-of-type {
      font-size: 16px;
    }
  }
</style>
