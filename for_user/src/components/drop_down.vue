<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-1">
    <md-drop-menu @change="dropDownChange" :data="data" :default-value="defaultYear" />
  </div>
</template>

<script>
import {DropMenu} from 'mand-mobile'

export default {
  name: 'drop-menu-demo',
  components: {
    [DropMenu.name]: DropMenu,
  },
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '年份',
          options: [
            {
              value: '2017',
              text: '2017',
            },
            {
              value: '2018',
              text: '2018',
            },
            {
              value: '2019',
              text: '2019',
            }
          ],
        }
      ],
      defaultYear:[]
    }
  },
  methods:{
    dropDownChange(barItem, listItem){
      this.$emit('change',barItem.text, listItem.value)
    }
  },
  beforeMount () {
    let nowYear = new Date().getFullYear()
    while(nowYear > Number(this.data[0].options[this.data[0].options.length-1].value)){
      this.data[0].options.push({
        value:`${nowYear}`,
        text:`${nowYear}`
      })
      nowYear--
    }
    this.defaultYear.push(`${nowYear}`)
  }
}
</script>

<style scoped>
</style>
