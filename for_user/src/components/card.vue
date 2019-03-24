<template>
  <div class="page">
    <div class="title">{{card_data.title}}课酬</div>
      <!-- {{card_data.title}} -->
    <div class="md-amount">
      <span v-if=!edit>
        ¥
        <md-amount
          :value="val"
          :duration="1500"
          transition
        ></md-amount>
      </span>
      <md-input-item
        class="input-item"
        v-else
        type="money"
        title="¥"
        name="money"
        v-validate="'required'"
        v-model=card_data.money
        @change="changeMoney"
        :error="errors.first('money')"
        clearable></md-input-item>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Amount,InputItem} from 'mand-mobile'

export default {
  components: {
    [Amount.name]: Amount,
    [InputItem.name]: InputItem
  },
  data() {
    return {
      val: 0,
    }
  },
  props:{
    card_data:Object,
    edit:Boolean
  },
  methods:{
    changeMoney(val){
      this.$emit('change',this.val)
    }
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
  .input-item{
    .md-input-item-input{
      font-size: 0.6rem;
    }
  }
}
</style>
