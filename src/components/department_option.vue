<template>
  <div class="department_option">
    <el-select v-model="value" placeholder="请选择" size="mini" @change="optionsChange">
      <ElOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></ElOption>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
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
    };
  },
  methods: {
    getOptions(){
      let self = this
      self.api.department.getAll(self).then(res=>{
        res.forEach(element => {
          self.options.push({
            value:element.department_name,
            label:element.department_name
          })
        })
      })
    },
    optionsChange(val) {
      this.$emit('change',val)
    },
  },
  mounted () {
    this.getOptions()
  }
}
</script>

<style scoped>
</style>
