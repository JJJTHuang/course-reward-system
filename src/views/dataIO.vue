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
      <excel-helper @change="showData" :propData="tableData" :dataIn="true"></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop="item.prop" :label="item.label" :min-width="item.minWidth">
      <span v-if="item.children !== undefined">
          <el-table-column
            v-for="(ele,i) in item.children"
            :key="i"
            :prop="ele.prop"
            :label="ele.label"
            :min-width="ele.minWidth"
          ></el-table-column>
        </span>
    </el-table-column>
    <el-table-column label="操作" min-width="120">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <template>
        <el-form-item v-for="(item,index) in tableConfig" :key="index" :label="item.label" :label-width="formLabelWidth">
          <el-input v-model="form[item.prop]" auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>

  <el-button class="submit" type="primary" size="large" @click="submit">提交</el-button>
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
          label: "课程信息"
        },
        {
          value: "2",
          label: "个人工作量"
        },
        {
          value: "3",
          label: "个人薪酬表"
        },
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
            minWidth: 60
          },
          {
            prop: "the_factor",
            label: "理论折合系数",
            minWidth: 60
          },
          {
            prop: "the_hours",
            label: "理论学时",
            minWidth: 60
          },
          {
            prop: "the_factor_hours",
            label: "理论折合学时",
            minWidth: 60
          },
          {
            prop: "exp_factor",
            label: "实验折合系数",
            minWidth: 60
          },
          {
            prop: "exp_hours",
            label: "实验学时",
            minWidth: 60
          },
          {
            prop: "exp_factor_hours",
            label: "实验折合学时",
            minWidth: 60
          },
          {
            prop: "teacher",
            label: "任课教师",
            minWidth: 60
          },
          {
            prop: "school_year",
            label: "学年",
            minWidth: 60
          },
          {
            prop: "semester",
            label: "学期",
            minWidth: 60
          },
          {
            prop: "campus_area",
            label: "校区",
            minWidth: 60
          },
          {
            prop: "tips",
            label: "备注信息",
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
            label: "理论学时"
          },
          {
            prop: "exp_hours",
            label: "实验学时",
            minWidth: 70
          },
          {
            prop: "campus_area",
            label: "校区",
            minWidth: 60
          },
          {
            prop: "credit",
            label: "学分"
          },
        ],
        [{
            prop: "teacher_id",
            label: "教师编号",
            minWidth: 80
          },
          {
            prop: "year_hours",
            label: "学年总学时",
            minWidth: 60
          },
          {
            prop: "base_remuneration", // 基础酬金
            label: "基础教学工作量以内酬金",
            minWidth: 60
          },
          {
            prop: "subsidy_remuneration", // 补贴酬金
            label: "基础教学工作量以外酬金",
            minWidth: 60
          },
          {
            prop: "cross_area_hours", // 跨校区另算工作量
            label: "跨校区工作量",
            minWidth: 60,
            tips: "非广州地区的校区"
          },
          {
            prop: "cross_area_remun", // 跨校区补贴酬金
            label: "跨校区补贴酬金",
            minWidth: 60
          },
          {
            prop: "total_remuneration", // 跨校区补贴酬金
            label: "学年总酬金",
            minWidth: 60
          },
          {
            prop: "year",
            label: "年度",
            minWidth: 60
          },
          {
            prop: "tips", // 跨校区补贴酬金
            label: "备注",
            minWidth: 60
          }
        ],
        [
          {
            prop: "teacher_id",
            label: "教师编号",
            minWidth: 60,
          },
          {
            prop: "Jan",
            label: "一月",
            minWidth: 60,
          },
          {
            prop: "Feb",
            label: "一月",
            minWidth: 60,
          },
          {
            prop: "Mar",
            label: "三月",
            minWidth: 60,
          },
          {
            prop: "Apr",
            label: "四月",
            minWidth: 60,
          },
          {
            prop: "May",
            label: "五月",
            minWidth: 60,
          },
          {
            prop: "Jun",
            label: "六月",
            minWidth: 60,
          },
          {
            prop: "Jul",
            label: "七月",
            minWidth: 60,
          },
          {
            prop: "Aug",
            label: "八月",
            minWidth: 60,
          },
          {
            prop: "Sep",
            label: "九月",
            minWidth: 60,
          },
          {
            prop: "Oct",
            label: "十月",
            minWidth: 60,
          },
          {
            prop: "Nov",
            label: "十一月",
            minWidth: 60,
          },
          {
            prop: "Oct",
            label: "十二月",
            minWidth: 60,
          },
          {
            prop:"year",
            label:"年度",
            minWidth:60
          }
        ]
      ],
      propData: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {}
    };
  },
  methods: {
    optionsChange(val) {
      this.tableConfig = this.configType[val];
    },
    confirm() {
      this.dialogFormVisible = false;
    },
    handleEdit(index) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.dialogFormVisible = true;
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      })
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    showData(data) {
      this.tableData = data;
    },
    submitTeachingTask() {
      let self = this,
        tableData = self.tableData,
        arr = [],
        res_tableData = []
      tableData.forEach((item) => {
        let data = new Array()
        item.process_id = String(item.process_id)
        item.class = item.class.split(',')
        item.class = item.class.map((item, index) => {
          item = item.replace(')', '')
          item = item.split('(')
          if (item.length > 1) {
            data[index] = {
              name: item[0],
              num: Number(item[1])
            }
            return data
          }
        })
        item.class = data
        arr.push(item.process_id)
        res_tableData.push(item)
      })

      self.api.teachingTask.getMoreExists(self, {
        process_id: arr
      }).then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            self.$message({
              type: "warning",
              message: `教学编号${item.process_id}已存在`
            })
          })
        } else {
          self.api.teachingTask.addAll(self, tableData).then(res => {
            self.tableData = []
            console.log(res)
            if (res[0].error !== undefined) {
              self.$message({
                type: "warning",
                message: `导入失败`
              })
            } else {
              self.$message({
                type: "success",
                message: `导入成功`
              })
            }
          })
        }
      })
    },
    submitTeacherInfo() {
      let self = this,
        flag = false,
        formatData = [];
      self.tableData.forEach((element, index) => {
        self.api.user
          .getExists(self, "teacher_id", [element.teacher_id])
          .then(res => {
            element.password = String(element.password);
            formatData.push(element);
            console.log(formatData);
            res.length > 0 ? (flag = true) : "";
            if (res.length > 0) {
              alert(`教师编号${element.teacher_id}重复`);
              return;
            }
            if (!flag && index == formatData.length - 1) {
              formatData.forEach(() => {
                self.api.user.registerMore(self, formatData).then(res => {
                  if (res.success) {
                    alert("上传成功");
                  }
                });
              });
            }
          });
      });
    },
    submitCourse() {
      let self = this,
        arr = []
      self.tableData.forEach((item) => {
        arr.push(item.course_id)
      })

      self.api.course.getMoreExists(self, {
        course_id: arr
      }).then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            self.$message({
              type: "warning",
              message: `课程代码${item.course_id}已存在`
            })
          })
        } else {
          self.api.course.addAll(self, self.tableData).then(res => {
            self.tableData = []
            console.log(res)
            if (res[0][0].error !== undefined) {
              self.$message({
                type: "warning",
                message: `导入失败`
              })
            } else {
              self.$message({
                type: "success",
                message: `导入成功`
              })
            }
          })
        }
      })
    },
    submitRemuneration() {
      let self = this,
        arr = []
      self.tableData.forEach((item) => {
        arr.push(item.teacher_id)
      })

      self.api.remuneration.getMoreExists(self, {
        teacher_id: arr
      }).then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            self.$message({
              type: "warning",
              message: `教师编号${item.teacher_id}已存在`
            })
          })
        } else {

          self.api.user.getUsers(self).then(res => {
            console.log(res)
            let s = ''
            res.forEach(item => {
              if (arr.indexOf(item.teacher_id) !== -1) {
                arr.splice(arr.indexOf(item.teacher_id), 1)
              }
            })
            console.log(arr)
            arr.forEach(item => {
              s += `${item},`
            })
            if (s !== '') {
              self.$message({
                type: "warning",
                message: `教师编号${s}不存在`
              })
            } else {
              self.api.remuneration.addAll(self, self.tableData).then(res => {
                self.tableData = []
                console.log(res)
                if (res[0][0].error !== undefined) {
                  self.$message({
                    type: "warning",
                    message: `导入失败`
                  })
                } else {
                  self.$message({
                    type: "success",
                    message: `导入成功`
                  })
                }
              })
            }
          })
        }
      })
    },
    submitPayment() {
      let self = this,
        arr = []
      self.tableData.forEach((item) => {
        arr.push(item.teacher_id)
      })

      self.api.payment.getMoreExists(self, {
        teacher_id: arr
      }).then(res => {
        if (res.length > 0) {
          res.forEach(item => {
            self.$message({
              type: "warning",
              message: `教师编号${item.teacher_id}已存在`
            })
          })
        } else {

          self.api.user.getUsers(self).then(res => {
            console.log(res)
            let s = ''
            res.forEach(item => {
              if (arr.indexOf(item.teacher_id) !== -1) {
                arr.splice(arr.indexOf(item.teacher_id), 1)
              }
            })
            console.log(arr)
            arr.forEach(item => {
              s += `${item},`
            })
            if (s !== '') {
              self.$message({
                type: "warning",
                message: `教师编号${s}不存在`
              })
            } else {
              self.api.payment.addAll(self, self.tableData).then(res => {
                self.tableData = []
                console.log(res)
                if (res[0][0].error !== undefined) {
                  self.$message({
                    type: "warning",
                    message: `导入失败`
                  })
                } else {
                  self.$message({
                    type: "success",
                    message: `导入成功`
                  })
                }
              })
            }
          })
        }
      })
    },
    submit() {
      let self = this;
      switch (self.value) {
        case "0":
          self.submitTeachingTask()
          break;
        case "1":
          self.submitCourse()
          break;
        case "2":
          self.submitRemuneration()
          break;
        case "3":
          self.submitPayment()
          break;
      }
    }
  },
  mounted() {
    this.tableConfig = this.configType[0];
  }
};
</script>

<style scoped>
.submit{
  margin-top: 20px;
}
</style>
