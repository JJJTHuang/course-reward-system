<template>
  <md-input-item
    :type="type"
    :title="title"
    :name="name"
    :placeholder="placeholder"
    v-model="innerValue"
    :error="error"
    @blur="onBlur"
    @change=""
    clearable
    :disabled=disabled
  >
  </md-input-item>
</template>

<script>
import { InputItem } from "mand-mobile"
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    propValue:String,
    disabled:Boolean
  },
  data() {
    return {
      innerValue: ""
    };
  },
  watch: {
    propValue(val){
      console.log(val)
      this.innerValue = this.propValue
    },
    innerValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    }
  },
  components: {
    [InputItem.name]: InputItem
  },
  mounted () {
    if(this.propValue){
      this.innerValue = this.propValue
    }
  }
};
</script>
