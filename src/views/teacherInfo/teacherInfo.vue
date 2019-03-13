<template>
  <div class="page">
    <el-row type="flex" align="middle">
      <el-col :span="12">
        <tab-nav path='/teacherInfo/ct'></tab-nav>
      </el-col>
      <el-col :span="4">
        <el-select v-model="faculty_value" placeholder="请选择" size="mini" @change="optionsChange">
          <ElOption
            v-for="item in options_faculty"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></ElOption>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="year_value" placeholder="请选择" size="mini" @change="optionsChange">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></ElOption>
        </el-select>
      </el-col>
      <el-col :span="4">
        <excel-helper :propData="tableData" @change="tableChange"></excel-helper>
      </el-col>
    </el-row>

    <el-table :data="tableData">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      options: [
        {
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
      options_faculty: [
        {
          value: "选项1",
          label: "药学院"
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
    }
  },
  methods: {
    optionsChange(){},
    tableChange(){}
  }
}
</script>

<style scoped>
</style>
