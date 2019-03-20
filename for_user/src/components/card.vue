<template>
  <div class="page">
    <div class="title">{{card_data.title}}课酬</div>
      <!-- {{card_data.title}} -->
    <div class="md-amount">
      ¥
      <md-amount
        :value="val"
        :duration="1500"
        transition
      ></md-amount>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Amount} from 'mand-mobile'

export default {
   name: 'amount-demo',
  components: {
    [Amount.name]: Amount,
  },
  data() {
    return {
      val: 0,
    }
  },
  props:{
    card_data:Object
  },
  methods:{

  },
  mounted () {
    setTimeout(() => {
      this.val = this.card_data.money
    }, 1000)
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
}
</style>
