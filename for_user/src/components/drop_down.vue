<template>
  <div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-1">
    <md-drop-menu @change="dropDownChange" :data="data" :default-value="['0']" />
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
              value: '0',
              text: '2017',
            },
            {
              value: '1',
              text: '2018',
            },
            {
              value: '2',
              text: '2019',
            }
          ],
        }
        // {
        //   text: '月份',
        //   options: [
        //     {
        //       value: '3',
        //       text: '一月',
        //     },
        //     {
        //       value: '4',
        //       text: '二月',
        //     },
        //     {
        //       value: '5',
        //       text: '三月',
        //     },
        //   ],
        // },
      ],
      payment:[
        {
            
        }
      ]
    }
  },
  methods:{
    dropDownChange(barItem, listItem){
      // console.log(barItem.text, listItem.value)
      this.$emit('change',barItem.text, listItem.value)
    }
  }
}
</script>

<style scoped>
</style>
