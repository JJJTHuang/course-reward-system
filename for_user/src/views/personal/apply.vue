<template>
  <div class="apply">
    <v-header title="课酬申改"></v-header>
    <div class="card-group">
      <md-field>
        <span class="year">{{year}}年</span>
        <md-field-item title="月份" :content="selectorValue"  @click="showSelector" arrow solid/>
      </md-field>
      <md-selector
        v-model="isSelectorShow"
        :default-value=selectorValue
        :data=data[0]
        max-height="320px"
        title="月份"
        @choose="onSelectorChoose"
      ></md-selector>
      <v-card @change="changeMoney" class="card" :edit=true :card_data="obj"></v-card>
    </div>
     <div class="btn-group" v-show=showBtn>
       <md-button round size="small" @click="reset">取消</md-button>
      <md-button type="primary" round size="small">确定</md-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Selector, Field, FieldItem,Button } from "mand-mobile";

export default {
  data() {
    return {
      oldobj:{},
      obj: {
        title: "",
        money: 0
      },
      isSelectorShow: false,
      cardData:[],
      data: [
        [
          {
            value: "1",
            text: "1"
          },
          {
            value: "2",
            text: "2"
          },
          {
            value: "3",
            text: "3"
          },
          {
            value: "4",
            text: "4"
          },
          {
            value: "5",
            text: "5"
          },
          {
            value: "6",
            text: "6"
          },
          {
            value: "7",
            text: "7"
          },
          {
            value: "8",
            text: "8"
          },
          {
            value: "9",
            text: "9"
          },
          {
            value: "10",
            text: "10"
          },
          {
            value: "11",
            text: "11"
          },
          {
            value: "12",
            text: "12"
          }
        ]
      ],
      selectorValue: "",
      showBtn:false,
      year:2019
    }
  },
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Button.name]: Button
  },
  methods: {
    getData(){
      let self = this,order = [],resArr = []

      self.cardData = []

      console.log({
        teacher_id:[localStorage.getItem('teacher_id')],
        year:[String(new Date().getFullYear())]
      })

      self.api.payment.getMoreExists(self,{
        teacher_id:[localStorage.getItem('teacher_id')],
        year:[String(new Date().getFullYear())]
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
        this.obj = {
          title: `${this.selectorValue}月待领`,
          money: this.cardData[Number(self.selectorValue)-1].money
        }
        this.oldobj = {
          title: `${this.selectorValue}月待领`,
          money: this.cardData[Number(self.selectorValue)-1].money
        }
        console.log(self.cardData,resArr)
      })
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({text,value}) {
      this.selectorValue = text
      this.obj = {
        title: `${this.selectorValue}月待领`,
        money: this.cardData[value-1].money
      }
      this.oldobj = {
        title: `${this.selectorValue}月待领`,
        money: this.cardData[value-1].money
      }
      console.log(text,value)
    },
    changeMoney(val){
      this.showBtn = true
      console.log(val)
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
    },
    update(){
      console.log(self.cardData)
    },
    reset(){
      this.obj = {
        title: this.oldobj.title,
        money: this.oldobj.money
      }
    }
  },
  mounted () {
    let nowMonth = this.obj.title = `${this.selectorValue}月待领`
    this.selectorValue = String(new Date().getMonth()+1)
    this.year = new Date().getFullYear()
    this.getData()
  }
};
</script>

<style lang="scss" scoped>
.apply{
  .card-group {
    width: 100%;
    text-align: center;
    padding: 0.1rem 10%;
    padding-top: 0.5rem;
    box-sizing: border-box;
    .year{
      font-size: 0.5rem;
    }
    .card {
      width: 100%;
      margin-top:0.8rem;
      padding-top: 1rem; 
      height: 4rem;
      box-sizing: border-box;
    }
  }
  .btn-group{
    margin-top: 0.8rem;
    margin-bottom: 1rem;
    width:100%;
    padding: 0 15%;
    box-sizing: border-box;
    display: flex;
    button{
      margin: 0.5rem;
    }
  }
}
</style>
