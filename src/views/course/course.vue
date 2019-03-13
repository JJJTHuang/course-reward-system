<template>
  <div class="page">
    <!-- span-method="objectSpanMethod -->
    <el-table :data="tableData" border>
    <el-table-column prop="department" label="开课部门" min-width="80">
    </el-table-column>
    <el-table-column prop="course_name" label="课程名称" min-width="120">
    </el-table-column>
    <!-- <el-table-column prop="course_code" label="课程代码" min-width="120">
    </el-table-column> -->
    <el-table-column prop="class_name" label="班级名称" min-width="120">
    </el-table-column>
    <!-- <el-table-column prop="teaching_num" label="教学编号" min-width="120">
    </el-table-column> -->
    <el-table-column prop="the_plan" label="理论课安排" min-width="120">
      <el-table-column prop="the_teachers" label="任课教师" min-width="180">
      </el-table-column>
      <el-table-column prop="the_hours" label="任课学时" min-width="60">
      </el-table-column>
    </el-table-column>
    <el-table-column prop="exp_plan" label="理论课安排" min-width="120">
      <el-table-column prop="exp_teachers" label="任课教师" min-width="180">
      </el-table-column>
      <el-table-column prop="exp_hours" label="任课学时" min-width="60">
      </el-table-column>
    </el-table-column>
    <el-table-column label="操作" min-width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="课程名称">
            <span>{{ props.row.course_name }}</span>
          </el-form-item>
          <el-form-item label="教学编号">
            <span>{{ props.row.teaching_num }}</span>
          </el-form-item>
          <el-form-item label="学分">
            <span>{{ props.row.credit }}</span>
          </el-form-item>
          <el-form-item label="总课时">
            <span>{{ props.row.the_hours+props.row.exp_hours }}</span>
          </el-form-item>
          <el-form-item label="课程代码">
            <span>{{ props.row.course_code }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
  </el-table>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="300"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [{
        department: '计算中心',
        course_name: 'C语言',
        course_code: 'C0509065',
        class_name: '15信管一班',
        teaching_num: '315',
        the_teachers: '李金阳(200333),\n王祖蓝(2003030)',
        the_hours: 54,
        exp_teachers: '李金阳(2003030),\n王祖蓝(2003030)',
        exp_hours: 27,
        credit: 4
      }, {
        department: '计算中心',
        course_name: 'C语言',
        course_code: 'C0509065',
        class_name: '15信管一班',
        teaching_num: '315',
        the_teachers: '李金阳(200333),\n王祖蓝(2003030)',
        the_hours: 54,
        exp_teachers: '李金阳(2003030),\n王祖蓝(2003030)',
        exp_hours: 27,
        credit: 4
      }, {
        department: '计算中心',
        course_name: 'C语言',
        course_code: 'C0509065',
        class_name: '15信管一班',
        teaching_num: '315',
        the_teachers: '李金阳(200333),\n王祖蓝(2003030)',
        the_hours: 54,
        exp_teachers: '李金阳(2003030),\n王祖蓝(2003030)',
        exp_hours: 27,
        credit: 4
      }],
    }
  },
  methods:{
    handleClick(row) {
      console.log(row)
    },
   handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  components: {

  }
}
</script>

<style scoped>
</style>
