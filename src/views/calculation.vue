<template>
<el-card>
  <el-form label-position="left" label-width="80px" :model="formLabelAlign">
    <el-form-item label="折合系数=">
      <span>{{totalPeople.name}}</span><el-input v-model="formLabelAlign.factor" disabled></el-input>
    </el-form-item>
    <el-form-item label="折合学时=">
      <el-input v-model="formLabelAlign.region"></el-input>
    </el-form-item>
    <el-form-item label="一人一班带教折合学时">
      <el-input v-model="formLabelAlign.type"></el-input>
    </el-form-item>
  </el-form>
</el-card>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
}

.el-form-item {
  text-align: left;
}
</style>
