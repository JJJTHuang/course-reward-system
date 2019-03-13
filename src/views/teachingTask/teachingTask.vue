<template>
<div class="page" v-loading.fullscreen.lock="fullscreenLoading">

  <el-row type="flex" align="middle">
    <el-col :span="12">
      <tab-nav path="/teachingTask/ct"></tab-nav>
    </el-col>
    <el-col :span="4">
      <el-select v-model="faculty_value" placeholder="请选择" size="mini" @change="optionsChange">
        <ElOption v-for="item in options_faculty" :key="item.value" :label="item.label" :value="item.value"></ElOption>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="year_value" placeholder="请选择" size="mini" @change="optionsChange">
        <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ElOption>
      </el-select>
    </el-col>
    <el-col :span="4">
      <excel-helper :propData="tableData"></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" show-summary border @cell-dblclick="tableDbEdit">
    <el-table-column prop="teaching_num" label="教学编号" type min-width="60"></el-table-column>
    <el-table-column prop="course_name" label="课程名称" min-width="60"></el-table-column>
    <el-table-column prop="class_name" label="班级名称" min-width="60"></el-table-column>
    <el-table-column prop="total_num" label="总人数" min-width="60"></el-table-column>
    <el-table-column prop="the_plan" label="理论课安排" min-width="60">
      <el-table-column prop="the_factor" label="理论折合系数" min-width="60"></el-table-column>
      <el-table-column prop="the_factor_hours" label="理论折合学时" min-width="60"></el-table-column>
    </el-table-column>
    <el-table-column prop="exp_plan" label="实验课安排" min-width="60">
      <el-table-column prop="exp_factor" label="实验折合系数" min-width="60"></el-table-column>
      <el-table-column prop="exp_factor_hours" label="实验折合学时" min-width="60"></el-table-column>
    </el-table-column>
    <el-table-column prop="exp_ready" label="实验准备" min-width="60">
      <el-table-column prop="exp_ready_factor" label="实验准备折合系数"></el-table-column>
      <el-table-column prop="exp_ready_factor_hours" label="实验准备折合学时"></el-table-column>
    </el-table-column>
    <el-table-column prop="total_hours" label="总折合学时" min-width="60"></el-table-column>
    <el-table-column label="备注信息"></el-table-column>
    <el-table-column label="操作" min-width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="理论安排">
            <div>任课教师:{{ props.row.the_teachers }}</div>
            <div>课时:{{ props.row.the_hours }}</div>
          </el-form-item>
          <el-form-item label="实验安排">
            <div>任课教师:{{ props.row.the_teachers }}</div>
            <div>课时:{{ props.row.the_hours }}</div>
          </el-form-item>
          <el-form-item label="开课部门">
            <span>{{ props.row.department }}</span>
          </el-form-item>
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
    </el-table-column>
  </el-table>

  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 30, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="300"></el-pagination>

</div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      fullscreenLoading: false, // 加载中
      imFile: "", // 导入文件el
      outFile: "", // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: "", // 错误信息内容
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableConfig: [{
        type: "expand",
        prop: "teaching_num",
        label: "教学编号",
        minWidth: 60
      }],
      tableData: [{
        department: "计算中心",
        teaching_num: "315",
        course_name: "C语言",
        course_code: "C0509065",
        class_name: "15信管(1),15信管(2),15信管(3)",
        the_teachers: "李金阳(200333),\n王祖蓝(2003030)",
        total_num: 128,
        the_hours: 54,
        the_factor: 1.5,
        the_factor_hours: 54.13212,
        exp_teachers: "李金阳(2003030),\n王祖蓝(2003030)",
        exp_hours: 27,
        exp_factor: 1.6,
        exp_factor_hours: 51.13212,
        exp_ready_factor: 1.67,
        exp_ready_factor_hours: 167,
        credit: 4
      }],
      options: [{
          value: "选项1",
          label: "2016-2017(1)"
        },
        {
          value: "选项2",
          label: "2016-2017(2)"
        },
        {
          value: "选项3",
          label: "2017-2018(1)"
        },
        {
          value: "选项4",
          label: "2017-2018(2)"
        },
        {
          value: "选项5",
          label: "2018-2019(1)"
        }
      ],
      year_value: "",
      options_faculty: [{
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "医药信息工程学院"
        },
        {
          value: "选项3",
          label: "食品科学院"
        },
        {
          value: "选项4",
          label: "中药学院"
        }
      ],
      faculty_value: ""
    };
  },
  methods: {
    handleClick(row, col, event) {
      console.log(row, col, event);
      row.editable = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    optionsChange(val) {
      console.log(val);
      // self.api.user.getUsers(self).then(res=>{
      //   console.log(res)
      // })
    },
    tableDbEdit(row, column, cell, event) { //编辑单元格数据
      //当鼠标双击单元格里面具体单元格的时候，即可对数据进行编辑操作，其实就是添加了一个输入框，最终将输入框中的数据保存下来就行了。
      let val = event.target.innerText
      event.target.innerHTML = "";
      let cellInput = document.createElement("input");
      cellInput.value = "";
      cellInput.setAttribute("type", "text");
      cellInput.value = val;
      cellInput.style.width = "60%";
      cell.appendChild(cellInput);
      cellInput.onblur = function () {
        cell.removeChild(cellInput);
        event.target.innerHTML = cellInput.value;
      };
    }
  },
  mounted() {}
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
}
</style>
