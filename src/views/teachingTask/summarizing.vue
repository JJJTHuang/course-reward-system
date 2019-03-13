<template>
  <div class="page">

    <el-row type="flex" align="middle">
      <el-col :span="12">
        <tab-nav path="/teachingTask/summarizing"></tab-nav>
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
        <excel-helper :propData=tableData @change="tableChange"></excel-helper>
      </el-col>
    </el-row>

    <el-table :data="tableData" border show-summary style="width: 100%">
      <el-table-column v-for="(item,index) in tableConfig" v-bind:key="index" :prop=item.prop :label=item.label :min-width=item.minWidth>
        <span v-if="item.children!==undefined">
          <el-table-column v-for="(ele,index) in item.children" v-bind:key="index" :prop=ele.prop :label=ele.label :min-width=ele.minWidth></el-table-column>
        </span>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableConfig: [
        {
          prop: "capmus_area",
          label: "校区",
          minWidth: 60,
        },
        {
          prop: "the_part",
          label: "理论课",
          minWidth: 60,
          more: true,
          children: [
            {
              prop: "the_hours",
              label: "理论课学时",
              minWidth: 60
            },
            {
              prop: "the_factor_hours",
              label: "理论课折合学时",
              minWidth: 60
            }
          ]
        },
        {
          prop: "exp_part",
          label: "实验课",
          minWidth: 60,
          more: true,
          children: [
            {
              prop: "exp_hours",
              label: "实验课学时",
              minWidth: 60
            },
            {
              prop: "exp_factor_hours",
              label: "实验课折合学时",
              minWidth: 60
            }
          ]
        },
        {
          prop: "practice_part",
          label: "实践课折合学时",
          minWidth: 60
        },
        {
          prop: "open_practice_part",
          label: "开放实践折合学时",
          minWidth: 60
        },
        {
          prop: "price",
          label: "学时单价",
          minWidth: 60
        },
        {
          prop: "hours_cost",
          label: "学时酬金",
          minWidth: 60
        },
        {
          prop: "other_cost",
          label: "其他酬金",
          minWidth: 60
        },
      ],
      tableData: [
        {
          capmus_area: "大学城",
          the_hours: "44",
          the_factor_hours: "234",
          exp_hours: "44",
          exp_factor_hours: "234",
          practice_part:'123',
          open_practice_part:'32',
          price:5,
          hours_cost:3000,
          other_cost:0
        },
        {
          capmus_area: "中山",
          the_hours: "44",
          the_factor_hours: "234",
          exp_hours: "44",
          exp_factor_hours: "234",
          practice_part:'123',
          open_practice_part:'32',
          price:5,
          hours_cost:3000,
          other_cost:0
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
    };
  },
  components: {},
  methods: {
    optionsChange(val) {
      console.log(val);
    },
    tableChange(data){
      this.tableData = data
    }
  }
}
</script>

<style scoped>
</style>
