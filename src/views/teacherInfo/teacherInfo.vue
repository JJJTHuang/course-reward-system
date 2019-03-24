<template>
  <div class="page">
    <el-row type="flex" align="middle">
      <el-col :span="16">
        <tab-nav path="/teacherInfo"></tab-nav>
      </el-col>
      <el-col :span="4">
        <department-option @change="departmentChange"></department-option>
      </el-col>
      <el-col :span="4">
        <excel-helper :propData=tableData :dataIn=false></excel-helper>
      </el-col>
    </el-row>

    <el-table :data="tableData" border>
      <el-table-column
        v-for="(item,index) in tableConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
      ></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="教师编号" :label-width="formLabelWidth" >
          <el-input v-model="form.teacher_id" auto-complete="off" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="薪资卡号" :label-width="formLabelWidth" >
          <el-input v-model="form.payment_card" auto-complete="off" disabled=true></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" :label-width="formLabelWidth">
          <el-input data-key="教师姓名" v-model="form.teacher_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师职称" :label-width="formLabelWidth">
          <el-input v-model="form.teacher_title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="300"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableConfig: [
        {
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
          prop:"tips",
          label:"备注",
          minWidth:60
        }
      ],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      oldform:{},
      form: {}
    };
  },
  methods: {
    departmentChange(val) {
      let self = this;
      self.getTableData("department", [val]);
    },
    getTableData(department, arr) {
      let self = this;
      self.tableData = [];
      if (arr && arr[0] === "all") {
        self.api.user.getUsers(self).then(res => {
          res.forEach(element => {
            if (!element.isAdmin) self.tableData.push(element);
          });
        });
      } else if (department) {
        self.api.user.getExists(self, department, arr).then(res => {
          res.forEach(element => {
            if (!element.isAdmin) self.tableData.push(element);
          });
        });
      } else {
        self.api.user.getUsers(self).then(res => {
          res.forEach(element => {
            if (!element.isAdmin) self.tableData.push(element);
          });
        });
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 表格编辑
    handleEdit(index) {  // param (index,row)
      this.form = this.tableData[index];
      this.oldform = {}
      for(let key in this.form){
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
      let self = this,data = {}
      console.log(self.form,self.oldform)
      for(let key in self.oldform){
        for(let i in self.form){
          if(key === i && self.oldform[key] !== self.form[i]){
            data[key] = self.oldform[key]
          }
          if(self.oldform[i] === undefined){
            data[i] = self.form[i]
          }
        }
      }
      console.log(data)
      self.api.user.update(self,self.form.objectId,data).then(()=>{
        self.$message({
          type: "success",
          message: "修改成功!"
        });
      })
      this.dialogFormVisible = false;
    },
    add(fn) {
      let self = this;
      self.api.user.register(self, self.form).then(() => {
        fn();
      });
    },
    del(objId, fn) {
      let self = this;
      self.api.user.del(self, objId).then(() => {
        fn();
      });
    }
  },
  mounted() {
    let self = this;
    self.getTableData();
  }
};
</script>

<style scoped>
</style>
