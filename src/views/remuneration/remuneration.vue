<template>
<div class="page">
  <el-row type="flex" align="middle">
    <el-col :span="12">
      <tab-nav path="/remuneration"></tab-nav>
    </el-col>
    <el-col :span="4">
      <whole-year @change="yearChange"></whole-year>
    </el-col>
    <el-col :span="4">
      <department-option @change="departmentChange"></department-option>
    </el-col>
    <el-col :span="4">
      <excel-helper :propData="tableData"></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" show-summary border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop="item.prop" :label="item.label" :min-width="item.minWidth">
      <template slot="header">
        <el-tooltip v-if="item.tips !== undefined" class="item" effect="dark" :content="item.tips" placement="bottom">
          <span>{{item.label}}</span>
        </el-tooltip>
        <span v-else>{{item.label}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="120">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="个人薪酬" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item v-for="(item,index) in tableConfig" :key="index" :label=item.label :label-width="formLabelWidth">
        <el-input v-model=form[item.prop] auto-complete="off" :disabled="item.prop=='teacher_name' || item.prop=='teacher_title'"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="300"></el-pagination>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableConfig: [{
          prop: "teacher_name",
          label: "教师名称",
          minWidth: 80
        },
        {
          prop: "teacher_title",
          label: "职称",
          minWidth: 60,
          show: false
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
          prop: "tips", // 跨校区补贴酬金
          label: "备注",
          minWidth: 60
        }
      ],
      tableData: [{
        teacher_name: "王祖蓝",
        teacher_title: "教授",
        year_hours: 187.89,
        base_remuneration: 1600,
        subsidy_remuneration: 2839.12,
        cross_area_hours: 123,
        cross_area_remun: 1233,
        total_remuneration: 71236,
        tips: "双肩挑",
        year: 2019,
      }],
      restrainData_year: {},
      restrainData_department: {},
      dialogFormVisible: false,
      formLabelWidth: "80px",
      oldform: {},
      form: {},
      start: 0,
      end: 10
    }
  },
  methods: {
    getTableData(start, end) {
      let self = this
      self.api.remuneration.getMoreExists(self, self.restrainData_year, start, end).then(res => {
        console.log(res)
        self.tableData = []
        res.map(item=>{
          self.restrainData_department.teacher_id = [item.teacher_id]
          self.api.user.getMoreExists(self,self.restrainData_department,start,end).then(res=>{
            console.log(res)
            if(res.length>0){
              item.teacher_name = res[0].teacher_name
              item.teacher_title = res[0].teacher_title
              item.teacher_id = res[0].teacher_id
              item.department = res[0].department
              self.tableData.push(item)  
            }
          })
        })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    yearChange(val) {
      console.log(val)
      if(val === 'all'){
        this.restrainData_year = {}
        this.getTableData(this.start,this.end)
      }else{
        this.restrainData_year.year = [val]
        this.getTableData(this.start,this.end)
      }
    },
    departmentChange(val) {
      if(val === 'all'){
        this.restrainData_department = {}
        this.getTableData(this.start,this.end) 
      }else{
        this.restrainData_department.department = [val]
        this.getTableData(this.start,this.end) 
      }
    },
    // 表格编辑
    handleEdit(index) { // param (index,row)
      this.form = this.tableData[index];
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
            i === 'tips' ? data[i] = self.form[i] : data[i] = Number(self.form[i])
          }
          if (self.oldform[i] === undefined) {
            i === 'tips' ? data[i] = self.form[i] : data[i] = Number(self.form[i])
          }
        }
      }
      console.log(data)
      self.api.remuneration.update(self, self.form.objectId, data).then(() => {
        self.$message({
          type: "success",
          message: "修改成功!"
        });
      })
      this.dialogFormVisible = false;
    },
    add() {},
    del(objId, fn) {
      let self = this;
      self.api.remuneration.del(self, objId).then(() => {
        fn();
      });
    }
  },
  mounted() {
    let self = this
    this.getTableData(self.restrainData, self.start, self.end)
  }
};
</script>

<style scoped>
</style>
