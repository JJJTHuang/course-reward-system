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

  <el-table :data="tableData" show-summary border v-loading="loading">
    <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop=item.prop :label=item.label :min-width=item.minWidth>
      <span v-if="item.children !==undefined">
        <el-table-column v-for="(ele,i) in item.children" :key="i" :prop=ele.prop :label=ele.label :min-width=ele.minWidth>
          <span v-if="ele.children !== undefined">
            <el-table-column v-for="(obj,j) in ele.children" :key="j" :prop=obj.prop :label=obj.label :min-width=obj.minWidth></el-table-column>
          </span>
        </el-table-column>
      </span>
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
          minWidth: 60
        },
        {
          prop: "theory",
          label: "理论课",
          minWidth: 60,
          children:[
            {
              prop: "the_cg",
              label: "赤岗",
              minWidth: 60,
              children:[
                {
                  prop: "the_cg_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "the_cg_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "the_ct",
              label: "大学城",
              minWidth: 60,
              children:[
                {
                  prop: "the_ct_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "the_ct_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "the_zs",
              label: "中山",
              minWidth: 60,
              children:[
                {
                  prop: "the_zs_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "the_zs_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "the_yf",
              label: "云浮",
              minWidth: 60,
              children:[
                {
                  prop: "the_yf_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "the_yf_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            }
          ]
        },
        {
          prop: "experiment",
          label: "实验课",
          minWidth: 60,
          children:[
            {
              prop: "exp_cg",
              label: "赤岗",
              minWidth: 60,
              children:[
                {
                  prop: "exp_cg_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "exp_cg_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "exp_ct",
              label: "大学城",
              minWidth: 60,
              children:[
                {
                  prop: "exp_ct_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "exp_ct_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "exp_zs",
              label: "中山",
              minWidth: 60,
              children:[
                {
                  prop: "exp_zs_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "exp_zs_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
            {
              prop: "exp_yf",
              label: "云浮",
              minWidth: 60,
              children:[
                {
                  prop: "exp_yf_ec",//elementary_course
                  label: "基础课",
                  minWidth: 60,
                },
                {
                  prop: "exp_yf_pc",//professional_course
                  label: "专业课",
                  minWidth: 60,
                }
              ]
            },
          ]
        },
        {
          prop:"sum",
          label:"小计",
          minWidth:60
        }
      ],
      tableData: [
        {
          teaching_name:'王祖蓝',
          teaching_title:'教授',
          the_ct_ec:127,
          the_ct_pc:147,
          the_zs_ec:127,
          the_zs_pc:147,
          the_cg_ec:127,
          the_cg_pc:147,
          the_yf_ec:127,
          the_yf_pc:147,
          exp_ct_ec:127,
          exp_ct_pc:147,
          exp_zs_ec:127,
          exp_zs_pc:147,
          exp_cg_ec:127,
          exp_cg_pc:147,
          exp_yf_ec:127,
          exp_yf_pc:147,
          sum:1598
        },
        {
          teaching_name:'王祖绿',
          teaching_title:'讲师',
          the_ct_ec:127,
          the_ct_pc:147,
          the_zs_ec:127,
          the_zs_pc:147,
          the_cg_ec:127,
          the_cg_pc:147,
          the_yf_ec:127,
          the_yf_pc:147,
          exp_ct_ec:127,
          exp_ct_pc:147,
          exp_zs_ec:127,
          exp_zs_pc:147,
          exp_cg_ec:127,
          exp_cg_pc:147,
          exp_yf_ec:127,
          exp_yf_pc:147,
          sum:1598
        }
      ],
      loading:true
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted () {
    let data = {
      teaching_name:'王祖蓝',
      teaching_title:'教授',
      the_ct_ec:127,
      the_ct_pc:147,
      the_zs_ec:127,
      the_zs_pc:147,
      the_cg_ec:127,
      the_cg_pc:147,
      the_yf_ec:127,
      the_yf_pc:147,
      exp_ct_ec:127,
      exp_ct_pc:147,
      exp_zs_ec:127,
      exp_zs_pc:147,
      exp_cg_ec:127,
      exp_cg_pc:147,
      exp_yf_ec:127,
      exp_yf_pc:147,
      sum:1598
    }
    let arr = []

    for(let i = 0;i<100;i++){
      arr.push(data)
    }

    this.tableData = arr
    this.loading = false
  }
}
</script>

<style scoped>
</style>
