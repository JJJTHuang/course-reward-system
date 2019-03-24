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
      cardData:[],
      year:"2019",
      teacher_id:''
    }
  },
  methods:{
    getData(){
      let self = this,order = [],resArr = []

      self.cardData = []

      self.api.payment.getMoreExists(self,{
        teacher_id:[this.teacher_id],
        year:[this.year]
      }).then(res=>{
        for(let key in res[0]){
          if(self.transMonth(key)){
            let data = {}
            data.title = self.transMonth(key)
            data.money = Number(res[0][key])
            data.order = Number(self.transMonthOrder(key))
            self.cardData.push(data)
            order.push(data.order)
            if(order.length === 12){
              order = order.sort((a,b)=>{return a-b})
            }
          }
        }

        order.forEach(i => {
          self.cardData.forEach(item=>{
            if(item.order === i) {
              resArr.push(item)
              return
            }
          })
        })
        self.cardData = resArr
        window.cardData = resArr
      })
    },
    DropdownChange(type,value){
      // console.log(type,value)
      this.year = value
      this.getData()
    },
    transMonth(val){
      let res = ''
      switch (val) {
        case 'Jan':
          res = '一月'
          break;
        case 'Feb':
          res = '二月'
          break;
        case 'Mar':
          res = '三月'
          break;
        case 'Apr':
          res = '四月'
          break;
        case 'May':
          res = '五月'
          break;
        case 'Jun':
          res = '六月'
          break;
        case 'Jul':
          res = '七月'
          break;
        case 'Aug':
          res = '八月'
          break;
        case 'Sep':
          res = '九月'
          break;
        case 'Oct':
          res = '十月'
          break;
        case 'Nov':
          res = '十一月'
          break;
        case 'Dec':
          res = '十二月'
          break;
        default:
        break;
      }
      return res
    },
    transMonthOrder(val){
      let res = ''
      switch (val) {
        case 'Jan':
          res = 1
          break;
        case 'Feb':
          res = 2
          break;
        case 'Mar':
          res = 3
          break;
        case 'Apr':
          res = 4
          break;
        case 'May':
          res = 5
          break;
        case 'Jun':
          res = 6
          break;
        case 'Jul':
          res = 7
          break;
        case 'Aug':
          res = 8
          break;
        case 'Sep':
          res = 9
          break;
        case 'Oct':
          res = 10
          break;
        case 'Nov':
          res = 11
          break;
        case 'Dec':
          res = 12
          break;
        default:
        break;
      }
      return res
    }
  },
  mounted () {
    let self = this
    self.year = `${new Date().getFullYear()}`
    self.teacher_id = localStorage.getItem('teacher_id')
    self.getData()
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
