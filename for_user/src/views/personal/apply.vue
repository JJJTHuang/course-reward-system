<template>
<div class="apply">
  <v-header title="课酬申改"></v-header>
  <div class="card-group">
    <md-field>
      <span class="year">{{year}}年</span>
      <md-field-item title="月份" :content="selectorValue" @click="showSelector" solid />
    </md-field>
    <md-selector v-model="isSelectorShow" :default-value="selectorValue" :data="data[0]" max-height="320px" title="月份" @choose="onSelectorChoose"></md-selector>

    <div class="card">
      <div class="title">{{title}}课酬</div>
      <div class="md-amount">
        <md-input-item class="input-item" type="money" title="¥" name="money" v-validate="'required'" v-model="money" data-vv-validate-on="input" :error="errors.first('money')" clearable @keyup="changeMoney" :disabled="selectorValue < new Date().getMonth()+1"></md-input-item>
      </div>
    </div>
  </div>
  <div class="btn-group" v-show="showBtn">
    <md-button round size="small" @click="reset">重置</md-button>
    <md-button type="primary" round size="small" @click="update">确定</md-button>
  </div>
</div>
</template>

<script>
import {
  Selector,
  Field,
  FieldItem,
  Button,
  Toast,
  InputItem
} from "mand-mobile";
var timer = null;
export default {
  data() {
    return {
      objectId:'',
      oldobj: {},
      title: "hhahah",
      money: 0,
      isSelectorShow: false,
      cardData: [],
      selectorValue: "",
      showBtn: true,
      total_payment: 0,
      year: 2019,
      data: [
        [{
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
      updateData:{},
      submit:true
    }
  },
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Button.name]: Button,
    [InputItem.name]: InputItem
  },
  methods: {
    getData() {
      let self = this,
        order = [],
        resArr = [];

      self.cardData = [];

      self.api.payment
        .getMoreExists(self, {
          teacher_id: [localStorage.getItem("teacher_id")],
          year: [String(new Date().getFullYear())]
        })
        .then(res => {
          this.objectId = res[0].objectId
          for (let key in res[0]) {
            if (self.transMonth(key)) {
              let data = {};
              data.title = self.transMonth(key);
              data.money = Number(res[0][key]);
              data.order = Number(self.transMonthOrder(key));
              self.cardData.push(data);
              order.push(data.order);
              if (order.length === 12) {
                order = order.sort((a, b) => {
                  return a - b;
                });
              }
            }
          }

          order.forEach(i => {
            self.cardData.forEach(item => {
              if (item.order === i) {
                resArr.push(item);
                return;
              }
            });
          });

          self.cardData = resArr;
          this.title = `${this.selectorValue}月待领`
          this.money = this.cardData[Number(self.selectorValue) - 1].money.toFixed(2)
          this.oldobj = {
            title: `${this.selectorValue}月待领`,
            money: this.cardData[Number(self.selectorValue) - 1].money
          };
          this.total_payment = res[0].total_payment;
        })
        .catch(() => {
          Toast({
            content: `数据加载失败`,
            icon: "warn"
          });
        });
    },
    showSelector() {
      this.isSelectorShow = true;
    },
    onSelectorChoose({text,value}) {
      this.selectorValue = text;
      this.title = `${this.selectorValue}月待领`;
      this.money = this.cardData[value - 1].money.toFixed(2);
      this.oldobj = {
        title: `${this.selectorValue}月待领`,
        money: this.cardData[value - 1].money
      };
    },
    changeMoney() {
      let self = this
      this.showBtn = true;
      this.debounce(function(){
        if(self.money.split('.')[1].length!==2){
          Toast({content: `自动保留两位小数`})
        }
        self.money = Number(self.money).toFixed(2)
      },1000)()
      this.checkMoney(this.selectorValue, Number(this.money))
      self.updateData[self.transNumtoMonth(self.selectorValue)] = String(self.money)
    },
    transMonth(val) {
      let res = "";
      switch (val) {
        case "Jan":
          res = "一月";
          break;
        case "Feb":
          res = "二月";
          break;
        case "Mar":
          res = "三月";
          break;
        case "Apr":
          res = "四月";
          break;
        case "May":
          res = "五月";
          break;
        case "Jun":
          res = "六月";
          break;
        case "Jul":
          res = "七月";
          break;
        case "Aug":
          res = "八月";
          break;
        case "Sep":
          res = "九月";
          break;
        case "Oct":
          res = "十月";
          break;
        case "Nov":
          res = "十一月";
          break;
        case "Dec":
          res = "十二月";
          break;
        default:
          break;
      }
      return res;
    },
    transMonthOrder(val) {
      let res = "";
      switch (val) {
        case "Jan":
          res = 1;
          break;
        case "Feb":
          res = 2;
          break;
        case "Mar":
          res = 3;
          break;
        case "Apr":
          res = 4;
          break;
        case "May":
          res = 5;
          break;
        case "Jun":
          res = 6;
          break;
        case "Jul":
          res = 7;
          break;
        case "Aug":
          res = 8;
          break;
        case "Sep":
          res = 9;
          break;
        case "Oct":
          res = 10;
          break;
        case "Nov":
          res = 11;
          break;
        case "Dec":
          res = 12;
          break;
        default:
          break;
      }
      return res;
    },
    transNumtoMonth(val){
      let res = "";
      switch (val) {
        case "1":
          res = "Jan";
          break;
        case "2":
          res = "Feb";
          break;
        case "3":
          res = "Mar";
          break;
        case "4":
          res = "Apr";
          break;
        case "5":
          res = "May";
          break;
        case "6":
          res = "Jun";
          break;
        case "7":
          res = "Jul";
          break;
        case "8":
          res = "Aug";
          break;
        case "9":
          res = "Sep";
          break;
        case "10":
          res = "Oct";
          break;
        case "11":
          res = "Nov";
          break;
        case "12":
          res = "Dec";
          break;
        default:
          break;
      }
      return res;
    },
    update() {
      let self = this
      if(this.submit){
        self.api.payment.update(self,self.objectId,self.updateData).then(()=>{
          Toast({
            content: `修改成功`,
            icon: "success"
          })
          self.getData()
        })
      }else{
        Toast({
          content: `调整金额过大,请重新调整`,
          icon: "warn"
        });
      }
    },
    reset() {
      this.title = this.oldobj.title;
      this.money = this.oldobj.money.toFixed(2);
    },
    checkMoney(month, money) {
      this.submit = true
      let sum = 0;
      this.cardData.forEach(item => {
        if (item.order === Number(month)) {
          sum += money;
        } else {
          sum += item.money;
        }
      });
      if (sum > Number(this.total_payment)) {
        Toast({
          content: `调整金额过大,请重新调整`,
          icon: "warn"
        });
        this.submit = false
      }
    },
    debounce(fn,wait){
      return function(){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn()
        },wait)
      }
    }
  },
  mounted() {
    this.title = `${this.selectorValue}月待领`;
    this.selectorValue = String(new Date().getMonth() + 1);
    this.year = new Date().getFullYear();
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.apply {
  .card-group {
    width: 100%;
    text-align: center;
    padding: 0.1rem 10%;
    padding-top: 0.5rem;
    box-sizing: border-box;

    .year {
      font-size: 0.5rem;
    }

    .card {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      width: 100%;
      margin-top: 0.8rem;
      padding-top: 1rem;
      height: 4rem;
      width: 100%;
      padding: 0.5rem;
      border-radius: 15px;

      .title {
        font-size: 30px;
      }

      .md-amount {
        font-size: 80px;
        margin-top: 0.8rem;
      }

      .input-item {
        .md-input-item-input {
          font-size: 0.6rem;
        }
      }
    }
  }
}

.btn-group {
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0 15%;
  box-sizing: border-box;
  display: flex;

  button {
    margin: 0.5rem;
  }
}
</style>
<style lang="scss">
.card {
  .md-field-item-content {

    .md-field-item-title,
    .md-input-item-input {
      font-weight: bold;
      font-size: 0.7rem;
    }

    .md-field-item-title {
      font-weight: 200;
    }

    .md-input-item-input {
      margin-left: -0.5rem;
      text-align: center !important;
    }
  }
}
</style>
