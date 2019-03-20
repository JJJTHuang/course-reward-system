<template>
<div class="page">
  <el-row type="flex" align="middle">
    <el-col :span="16">
      <tab-nav path="/course/zs"></tab-nav>
    </el-col>
    <el-col :span="4">
      <department-option @change="departmentChange"></department-option>
    </el-col>
    <el-col :span="4">
      <excel-helper :propData="tableData"></excel-helper>
    </el-col>
  </el-row>
  <el-table :data="tableData" border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop=item.prop :label=item.label :min-width=item.minWidth></el-table-column>
    <el-table-column label="操作" min-width="100">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="300"></el-pagination>

  <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item v-for="(item,index) in tableConfig" :key="index" :label=item.label :label-width="formLabelWidth">
        <el-input v-model=form[item.prop] auto-complete="off"></el-input>
      </el-form-item>
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
          prop: "credit",
          label: "学分"
        }
      ],
      tableData: [{
        department: "计算中心",
        course_name: "C语言",
        course_id: "C0509065",
        the_hours: 54,
        exp_hours: 27,
        total_hours: 72,
        credit: 4,
        course_type: '基础课'
      }],
      restrainData: {
        campus_area: ['中山']
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      oldform: {},
      form: {},
      start: 0,
      end: 10
    };
  },
  methods: {
    getTableData(restrainData, start, end) {
      let self = this

      self.api.course.getMoreExists(self, restrainData, start, end).then(res => {
        self.tableData = res
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // option
    departmentChange(val) {
      let self = this
      if (val == "all") {
        self.restrainData = {
          campus_area: ['中山']
        }
        this.getTableData(self.restrainData, self.start, self.end)
      } else {
        self.restrainData.department = [val]
        this.getTableData(self.restrainData, self.start, self.end)
      }
    },
    // 表格编辑
    handleEdit(index, row) {

      this.form = this.tableData[index];
      console.log(this.form)
      this.oldform = {}
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
      }).then(option => {
        if (option) {
          this.del(row.objectId, () => {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        }
      });
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
            if(i === 'exp_hours' || i === 'the_hours'|| i === 'credit'){
              data[i] = Number(data[i])
            }
          }
          if (self.oldform[i] === undefined) {
            data[i] = self.form[i]
            if(i === 'exp_hours' || i === 'the_hours'|| i === 'credit'){
              data[i] = Number(data[i])
            }
          }
        }
      }
      console.log(data)
      self.api.course.update(self, self.form.objectId, data).then(res => {
        self.$message({
          type: "success",
          message: "修改成功!"
        });
      })
      this.dialogFormVisible = false;
    },
    del(objId, fn) {
      let self = this;
      self.api.course.del(self, objId).then(res => {
        fn();
      });
    }
  },
  mounted() {
    let self = this
    this.getTableData(self.restrainData, self.start, self.end)
  }
}
</script>

<style scoped>
</style>
