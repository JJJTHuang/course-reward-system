<template>
  <div class="course_card">
    <md-field class="field" :title=courseData.course_name :brief=courseData.campus_area>
      <div class="action-container" slot="action">
        <div>理论课时:{{courseData.the_hours}}</div>
        <div>实验课时:{{courseData.exp_hours}}</div>
      </div>
      <md-field-item solid title="授课班级" :content=courseData.class />
      <md-field-item solid title="授课教师" :content=courseData.teacher />
      <md-input-item
        type="text"
        title="授课地点"
        name="classroom"
        v-model=classroom
        @change = "changeRoom"
        clearable
      ></md-input-item>
      <md-input-item
        type="text"
        title="备注信息"
        name="tips"
        v-model=tips
        @change = "changeTips"
        clearable
      ></md-input-item>
    </md-field>
  </div>
</template>

<script>
import { InputItem, FieldItem, Field, Button, Toast } from "mand-mobile";
export default {
  data() {
    return {
      classroom:'',
      tips:''
    }
  },
  props: {
    courseData: Object
  },
  components: {
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Button.name]: Button,
    [Field.name]: Field
  },
  methods: {
    changeRoom(name, value){
      localStorage.setItem(`${this.courseData.course_name}${this.courseData.campus_area}`,value)
    },
    changeTips(name, value){
      localStorage.setItem(`${this.courseData.course_name}${this.courseData.campus_area}tips`,value)
    }
  },
  mounted () {
    if(localStorage.getItem(`${this.courseData.course_name}${this.courseData.campus_area}`)){
      this.classroom = localStorage.getItem(`${this.courseData.course_name}${this.courseData.campus_area}`)
    }
    if(localStorage.getItem(`${this.courseData.course_name}${this.courseData.campus_area}tips`)){
      this.tips = localStorage.getItem(`${this.courseData.course_name}${this.courseData.campus_area}tips`)
    }
  }
};
</script>

<style lang="scss" scoped>
.course_card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  border-radius: 15px;
  margin: 1rem 0;
}
.md-field-item-control{
  text-align: left;
}
</style>
<style lang="scss">
.md-field-brief {
  text-align: left;
}
</style>
