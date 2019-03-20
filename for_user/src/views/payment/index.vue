<template>
  <div class="page">
    <drop-down @change="DropdownChange"></drop-down>
    <div class="card-group">
      <v-card v-for="(item,index) in cardData" :key="index" :card_data=item class="card"></v-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import drop_down from '@/components/drop_down.vue'
import { Toast } from 'mand-mobile'

export default {
  components: {
    'drop-down':drop_down
  },
  data() {
    return {
      cardData:[
        {
          title:'一月',
          money:1500
        },
        {
          title:'二月',
          money:1500
        },
        {
          title:'三月',
          money:1500
        },
      ]
    }
  },
  methods:{
    DropdownChange(type,value){
      console.log(type,value)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.page{
  .card-group{
    width:100%;
    text-align: center;
    padding: 1rem 10%;
    box-sizing: border-box;
    .card{
      width: 100%;
      margin: 1rem 0;
      box-sizing: border-box;
    }
  }
}
</style>
