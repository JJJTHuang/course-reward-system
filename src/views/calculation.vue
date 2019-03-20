<template>
<div class="calculation">
  <el-card>
    <div slot="header" class="clearfix">
      <span>换算公式集合</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-form label-position="left" :model="formLabelAlign">
      <el-form-item label="理论折合系数=">
        <span class="inline">{{totalPeople.name}}</span><el-input size="small" v-model="formLabelAlign.factor" disabled></el-input>
      </el-form-item>
      <el-form-item label="实验折合系数=">
        <span class="inline">{{totalPeople.name}}</span><el-input size="small" v-model="formLabelAlign.factor" disabled></el-input>
      </el-form-item>
      <el-form-item label="折合学时=">
        <el-input size="small" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="一人一班带教折合学时">
        <el-input size="small" v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card>
    <div slot="header" class="clearfix">
      <span>课酬标准</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item,index) in tableConfig" :key="index" :prop=item.prop :label=item.label :min-width=item.minWidth>
        <span v-if="item.children !== undefined">
          <el-table-column v-for="(ele,i) in item.children" :key="i" :prop=item.prop :label=item.label :min-width=item.minWidth></el-table-column>
        </span>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  data() {
    var totalPeople = {
        name: '合班上课人数',
        val: 100
      }
    return {
      totalPeople: {
        name: '合班上课人数',
        val: 100
      },
      formLabelAlign: {
        factor: `${totalPeople.val}`,
        region: '',
        type: ''
      },
      tableConfig:[
        {
          prop:"title",
          label:"职级",
          minWidth:60
        },
        {
          prop:"theory",
          label:"理论课",
          minWidth:60,
          children:[
            {
              prop:"the_ec", //elementary_course
              label:"理论基础课",
              minWidth:60,
            },
            {
              prop:"the_pc", //professional_course
              label:"理论专业课",
              minWidth:60,
            }
          ]
        },
        {
          prop:"experiment",
          label:"实验课",
          minWidth:60,
          children:[
            {
              prop:"exp_ec", //elementary_course
              label:"实验基础课",
              minWidth:60,
            },
            {
              prop:"exp_pc", //professional_course
              label:"实验专业课",
              minWidth:60,
            }
          ]
        },
      ],
      tableData:[]
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation{
  .el-card{
    margin: 20px;
    margin-bottom: 40px;
    .clearfix{
      text-align: left;
      &::before,&::after {
        display: table;
        content: "";
      }
      &::after {
        clear: both
      }
    }
    .el-form {
      .el-form-item {
        text-align: left;
        padding-bottom: 20px;
        border-bottom: 1px dashed $second-border;
        .el-input{
          width: 100px;
          margin: 0 5px;
        }
      }
      .el-form-item:last-of-type{
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  }
}
</style>
