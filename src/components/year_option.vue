<template>
<div class="page">
  <el-select v-model="value" placeholder="请选择" size="mini" @change="optionsChange">
    <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></ElOption>
  </el-select>
</div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "all",
          label: "全部"
        }
      ],
      value: "all"
    }
  },
  methods:{
    optionsChange(val) {
      this.$emit('change',val)
    },
    getOptions(){
      let self = this
      self.api.semester.getAll(self).then(res=>{
        res.forEach(element => {
          self.options.push({
            value:`${element.year},${element.term}`,
            label:`${element.year} - (${element.term})`
          })
        })
      })
    }
  },
  mounted() {
    this.getOptions()
  }
}
</script>

<style scoped>
</style>
