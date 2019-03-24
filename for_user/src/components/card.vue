<template>
  <div class="page">
    <div class="title">{{title}}课酬</div>
    <div class="md-amount">
      <span v-if=!edit>
        ¥
        <md-amount
          :value="val"
          :duration="1500"
          transition
        ></md-amount>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Amount,InputItem,Toast} from 'mand-mobile'
export default {
  components: {
    [Amount.name]: Amount,
    [InputItem.name]: InputItem,
    [Toast.name]: Toast
  },
  data() {
    return {
      val: 0,
    }
  },
  props:{
    title:String,
    money:Number,
    edit:Boolean
  },
  mounted () {
    this.val = this.money
  }
}
</script>

<style lang="scss" scoped>
.page{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  padding: 0.5rem;
  border-radius: 15px;
  .title{
    font-size: 30px;
  }
  .md-amount{
    font-size: 80px;
    margin-top: 0.8rem;
  }
  .input-item{
    .md-input-item-input{
      font-size: 0.6rem;
    }
  }
}
</style>
