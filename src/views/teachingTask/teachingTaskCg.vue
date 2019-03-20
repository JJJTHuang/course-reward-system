<template>
<div class="page">
  <el-row type="flex" align="middle">
    <el-col :span="14">
      <tab-nav path="/teachingTask/cg"></tab-nav>
    </el-col>
    <el-col :span="4">
      <department-option @change="departmentChange"></department-option>
    </el-col>
    <el-col :span="4">
      <year-option @change="yearChange"></year-option>
    </el-col>
    <el-col :span="2">
      <excel-helper :propData=tableData :dataIn=false></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" show-summary border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop=item.prop :label=item.label :min-width=item.minWidth>
    </el-table-column>
    <el-table-column label="操作" min-width="100">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="300"></el-pagination>

  <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <template>
        <el-form-item v-for="(item,index) in tableConfig" :key="index" :label=item.label :label-width="formLabelWidth">
          <el-input v-model=form[item.prop] auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableConfig: [{
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
        {
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
        {
          prop: "total_factor_hours",
          label: "总折合学时",
          minWidth: 60,
        },
        {
          prop: "teacher",
          label: "任课教师",
          minWidth: 60,
        },
        {
          prop: "tips",
          label: "备注信息",
          minWidth: 60,
        },
      ],
      tableData: [],
      restrainData: {
        campus_area: ['赤岗']
      },
      start: 0,
      end: 10,
      propData: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      oldform: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // table option
    departmentChange(val) {
      let self = this
      if (val == "all") {
        self.restrainData = {
          campus_area: ['赤岗']
        }
        this.getTableData(self.restrainData, self.start, self.end)
      } else {
        self.restrainData.department = [val]
        this.getTableData(self.restrainData, self.start, self.end)
      }
    },
    yearChange(val) {
      let self = this
      if (val == "all") {
        self.restrainData = {
          campus_area: ['赤岗']
        }
        this.getTableData(self.restrainData, self.start, self.end)
      } else {
        val = val.split(',')
        val[1] = Number(val[1])
        self.restrainData.school_year = [val[0]]
        self.restrainData.semester = [val[1]]
        self.getTableData(self.restrainData, self.start, self.end)
      }
    },
    getTableData(data, start, end) {
      let self = this,tableData = []
      self.api.teachingTask.getMoreExists(self, data, start, end).then(res => {
        self.tableData = []
        res.forEach((item, index) => {
          // 计算总学时
          item.total_factor_hours = Number(item.the_factor_hours) + Number(item.exp_factor_hours)
          // class format
          let _class = ''
          item.class.forEach(item => {
            _class += `${item.name}(${item.num}),`
          })
          item.class = _class

          self.tableData.push(item)
        })
      })
    },
    handleEdit(index, row) {
      this.form = this.tableData[index];
      for (let key in this.form) {
        this.oldform[key] = this.form[key]
      }
      this.currentIndex = index;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then((option) => {
        if (option) {
          this.del(row.objectId, () => {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    update() {
      let self = this,
        data = {}
      console.log(self.form, self.oldform)
      for (let key in self.oldform) {
        for (let i in self.form) {
          if (key === i && self.oldform[key] !== self.form[i]) {
            data[i] = self.form[i]
            if (i === 'stu_num' || i === 'process_id' || i === 'semester') {
              data[i] = Number(data[i])
            }
          }
          if (self.oldform[i] === undefined) {
            data[i] = self.form[i]
            if (i === 'stu_num' || i === 'process_id' || i === 'semester') {
              data[i] = Number(data[i])
            }
          }
        }
      }
      console.log(data)

      self.api.teachingTask.update(self, self.form.objectId, data).then(res => {
        self.$message({
          type: "success",
          message: "修改成功!"
        });
      })

      this.dialogFormVisible = false;
    },
    del(objId, fn) {
      let self = this;
      self.api.teachingTask.del(self, objId).then(res => {
        fn();
      });
    }
  },
  mounted() {
    let self = this;
    self.getTableData(self.restrainData, 0, 10);
  }
};
</script>

<style lang="scss" scoped>
.page {
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;

    .el-breadcrumb__item:first-of-type {
      font-size: 16px;
    }
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-pagination {
    padding: 20px 5px;
    text-align: right;
  }
}
</style>
