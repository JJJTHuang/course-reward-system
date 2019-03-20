<template>
<div class="page">
  <el-row type="flex" align="middle">
    <el-col :span="12">
      <tab-nav path="/remuneration"></tab-nav>
    </el-col>
    <el-col :span="8">
    </el-col>
    <el-col :span="4">
      <excel-helper :propData="tableData"></excel-helper>
    </el-col>
  </el-row>

  <el-table :data="tableData" show-summary border>
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop=item.prop :label=item.label :min-width=item.minWidth>
      <template slot="header">
        <el-tooltip v-if="item.tips !== undefined" class="item" effect="dark" :content=item.tips placement="bottom">
          <span>{{item.label}}</span>
        </el-tooltip>
        <span v-else>{{item.label}}</span>
      </template>
    </el-table-column>
    <el-table-column label="详情">
      <template slot-scope="scope">
        <el-button @click="toMore(scope.row)" type="text" size="small">查看</el-button>
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
      tableConfig: [
        {
          prop: "teaching_name",
          label: "教师名称",
          minWidth: 80
        },
        {
          prop: "teaching_title",
          label: "职称",
          minWidth: 60,
          show:false
        },
        {
          prop:"year_hours",
          label:"学年总学时",
          minWidth:60
        },
        {
          prop:"base_remuneration", // 基础酬金
          label:"基础教学工作量以内酬金",
          minWidth:60
        },
        {
          prop:"subsidy_remuneration", // 补贴酬金
          label:"基础教学工作量以外酬金",
          minWidth:60
        },
        {
          prop:"cross_area_hours", // 跨校区另算工作量
          label:"跨校区工作量",
          minWidth:60,
          tips:'非广州地区的校区'
        },
        {
          prop:"cross_area_remuneration", // 跨校区补贴酬金
          label:"跨校区补贴酬金",
          minWidth:60
        },
        {
          prop:"total_remuneration", // 跨校区补贴酬金
          label:"学年总酬金",
          minWidth:60
        },
        {
          prop:"tips", // 跨校区补贴酬金
          label:"备注",
          minWidth:60
        },
        // {
        //   prop:"more",
        //   label:"详情",
        //   minWidth:60,
        // }
      ],
      tableData: [
        {
          teaching_name:'王祖蓝',
          teaching_title:'教授',
          year_hours:187.89,
          base_remuneration:1600,
          subsidy_remuneration:2839.12,
          cross_area_hours:123,
          cross_area_remuneration:1233,
          total_remuneration:71236,
          tips:"双肩挑"
        }
      ],
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toMore(data){
      console.log(data)
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
