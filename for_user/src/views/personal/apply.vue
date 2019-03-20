<template>
  <div class="page">
    <v-header title="课酬申改"></v-header>
    <div class="card-group">
      <md-field>
        <md-field-item title="月份" :content="selectorValue" @click="showSelector" arrow solid/>
      </md-field>
      <md-selector
        v-model="isSelectorShow"
        default-value="2"
        :data="data[0]"
        max-height="320px"
        title="月份"
        @choose="onSelectorChoose"
      ></md-selector>
      <v-card class="card" :card_data="obj"></v-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Selector, Field, FieldItem } from "mand-mobile";

export default {
  data() {
    return {
      obj: {
        title: "下月待领",
        money: 1700
      },
      isSelectorShow: false,
      data: [
        [
          {
            value: "1",
            text: "一"
          },
          {
            value: "2",
            text: "二"
          },
          {
            value: "3",
            text: "三"
          },
          {
            value: "4",
            text: "四"
          },
          {
            value: "5",
            text: "五"
          },
          {
            value: "6",
            text: "六"
          },
          {
            value: "7",
            text: "七"
          },
          {
            value: "8",
            text: "八"
          },
          {
            value: "9",
            text: "九"
          },
          {
            value: "10",
            text: "十"
          }
        ]
      ],
      selectorValue: "二"
    };
  },
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({text}) {
      this.selectorValue = text
      this.obj.title = `${this.selectorValue}月待领`
    },
  },
  mounted () {
    this.obj.title = `${this.selectorValue}月待领`
  }
};
</script>

<style lang="scss" scoped>
.card-group {
  width: 100%;
  text-align: center;
  padding: 0.1rem 10%;
  box-sizing: border-box;
  .card {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
