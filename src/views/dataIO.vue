<template>
<div class="page">
  <el-row type="flex" align="middle">
    <el-col :span="16">
      <tab-nav path="/dataIO"></tab-nav>
    </el-col>
    <el-col :span="4">
      <el-select v-model="value" placeholder="请选择" size="mini" @change="optionsChange">
        <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ElOption>
      </el-select>
    </el-col>
    <el-col :span="4">
      <excel-helper @change="showData" :propData=tableData :dataIn=true></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop="item.prop" :label="item.label" :min-width="item.minWidth">
      <span v-if="item.children !== undefined">
        <el-table-column v-for="(ele,i) in item.children" :key="i" :prop="ele.prop" :label="ele.label" :min-width="ele.minWidth"></el-table-column>
      </span>
    </el-table-column>
  </el-table>

  <el-button type="primary" size="small" @click="submit">提交</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: "0",
      tableConfig: [],
      tableData: [],
      options: [{
          value: "0",
          label: "教学任务"
        },
        {
          value: "1",
          label: "教师信息"
        },
        {
          value: "2",
          label: "课程"
        }
      ],
      configType: [
        [{
            prop: "process_id",
            label: "教学编号",
            minWidth: 60
          },
          {
            prop: "course_name",
            label: "课程名称",
            minWidth: 60
          },
          {
            prop: "class",
            label: "班级",
            minWidth: 60
          },
          {
            prop: "stu_num",
            label: "总人数",
            minWidth: 60,
          },
          {
            prop: "the_plan",
            label: "理论课安排",
            minWidth: 60,
            children: [{
                prop: "the_factor",
                label: "理论折合系数",
                minWidth: 60,
              },
              {
                prop: "the_hours",
                label: "理论学时",
                minWidth: 60,
              },
              {
                prop: "the_factor_hours",
                label: "理论折合学时",
                minWidth: 60,
              },
            ]
          },
          {
            prop: "exp_plan",
            label: "实验课安排",
            minWidth: 60,
            children: [{
                prop: "exp_factor",
                label: "实验折合系数",
                minWidth: 60,
              },
              {
                prop: "exp_hours",
                label: "实验学时",
                minWidth: 60,
              },
              {
                prop: "exp_factor_hours",
                label: "实验折合学时",
                minWidth: 60,
              },
            ]
          },
          {
            prop: "total_factor_hours",
            label: "总折合学时",
            minWidth: 60,
          },
          {
            prop: "teachers",
            label: "任课教师",
            minWidth: 60,
          },
          {
            prop: "tips",
            label: "备注信息",
            minWidth: 60,
          },
          {
            prop: "school_year",
            label: '学年',
            minWidth: 60,
          },
          {
            prop: "semester",
            label: '学期',
            minWidth: 60,
          }
        ],
        [{
            prop: "teacher_id",
            label: "教师编号",
            minWidth: 60
          },
          {
            prop: "teacher_name",
            label: "教师姓名",
            minWidth: 60
          },
          {
            prop: "username",
            label: "初始用户名",
            minWidth: 60
          },
          {
            prop: "password",
            label: "初始密码",
            minWidth: 60
          },
          {
            prop: "tel",
            label: "联系电话",
            minWidth: 60
          },
          {
            prop: "teacher_title",
            label: "教师职称",
            minWidth: 60
          },
          {
            prop: "payment_card",
            label: "薪资卡号",
            minWidth: 60
          },
          {
            prop: "department",
            label: "所属部门",
            minWidth: 60
          }, {
            prop: "email",
            label: "电子邮箱",
            minWidth: 60
          }
        ],
        [{
            prop: "department",
            label: "开课部门",
            minWidth: 0
          },
          {
            prop: "course_name",
            label: "课程名称",
            minWidth: 0
          },
          {
            prop: "course_id",
            label: "课程代码",
            minWidth: 0
          },
          {
            prop: "the_hours",
            label: "理论学时",
          },
          {
            prop: "exp_hours",
            label: "实验学时",
            minWidth: 70
          },
          {
            prop: "total_hours",
            label: "总学时",
            minWidth: 60
          },
          {
            prop: "credit",
            label: "学分"
          },
          {
            prop: "course_type",
            label: "课程类型"
          }
        ]
      ]
    };
  },
  methods: {
    optionsChange(val) {
      this.tableConfig = this.configType[val]
    },
    showData(data) {
      this.tableData = data
    },
    submitTeacherInfo() {
      let self = this,flag = false,formatData = []
      self.tableData.forEach((element,index) => {
        self.api.user.getExists(self, 'teacher_id',[element.teacher_id]).then(res=>{
          element.password = String(element.password)
          formatData.push(element)
          console.log(formatData)
          res.length > 0 ? flag = true : ''
          if(res.length > 0){
            alert(`教师编号${element.teacher_id}重复`)
            return
          }
          if(!flag && index==formatData.length-1){
            formatData.forEach(item=>{
              self.api.user.registerMore(self, formatData).then(res=>{
                if(res.success){
                  alert('上传成功')
                }
              })
            })
          }
        })
      })
    },
    submit() {
      let self = this
      switch (self.value) {
        case '0':

          break;
        case '1':
        self.submitTeacherInfo()
          break;
        case '2':

          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.tableConfig = this.configType[0]
  }
};
</script>

<style scoped>
</style>
