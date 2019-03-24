<template>
  <div class="course">
    <md-drop-menu :data="data" :default-value="defaultVal" @change="dropDownChange"/>
    <div class="course_group">
      <course-card v-for="(item,index) in courseData" :key="index" :courseData=item></course-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import course_card from '@/components/course_card.vue'
import {DropMenu} from 'mand-mobile'
export default {
  data() {
    return {
      isContentShow: false,
      data: [
        {
          text: '学年',
          options: [ 
            {
              value: '2017-2018(1)',
              text: '2017-2018(1)',
            },
            {
              value: '2017-2018(2)',
              text: '2017-2018(2)',
            }
          ],
        },
        {
          text: '校区',
          options: [
            {
              value: '大学城',
              text: '大学城',
            },
            {
              value: '中山',
              text: '中山',
            },
            {
              value: '云浮',
              text: '云浮',
            },
            {
              value: '赤岗',
              text: '赤岗',
            },
          ],
        },
      ],
      defaultVal:['大学城'],
      school_year:'2018',
      semester:'1',
      campus_area:'大学城',
      rel_teacher:'',
      courseData:[]
    }
  },
  components: {
    [DropMenu.name]: DropMenu,
    'course-card':course_card
  },
  beforeMount () {
    this.rel_teacher = localStorage.getItem('teacher_id')
    this.getOptionYear()
  },
  methods: {
    dropDownChange(type,option){
      if(type.text === "学年"){
        this.school_year = option.value.split('(')[0]
        this.semester = option.value.split('(')[1].replace(')','')
      }else{
        this.campus_area = option.value
      }
      this.getData()
    },
    getOptionYear(){
      let nowYear = new Date().getFullYear()
      let nowMonth = new Date().getMonth()+1
      let nowTerm = (nowMonth > 2 && nowMonth < 9) ? 2 : 1
      while(nowYear > Number(this.data[0].options[this.data[0].options.length-1].value.split('-')[0])){
        this.data[0].options.push({
          value:`${nowYear-1}-${nowYear}(1)`,
          text:`${nowYear-1}-${nowYear}(1)`
        })
        this.data[0].options.push({
          value:`${nowYear-1}-${nowYear}(2)`,
          text:`${nowYear-1}-${nowYear}(2)`
        })
        nowYear--
      }
      this.defaultVal.unshift(`${new Date().getFullYear()-1}-${new Date().getFullYear()}(${nowTerm})`)
      this.school_year = `${new Date().getFullYear()-1}-${new Date().getFullYear()}`
      this.semester = `${nowTerm}`
    },
    getData(){
      let self = this
      self.courseData = []
      self.api.teachingTask.getMoreExists(self,{
        school_year:[self.school_year],
        semester:[self.semester],
        campus_area:[self.campus_area],
        rel_teacher:[self.rel_teacher]
      }).then(res=>{
        res.forEach(item => {
          let _class = ''
          item.class.forEach(ele=>{
            _class += `${ele.name}(${ele.num})  `
          })
          self.courseData.push({
            course_name:item.course_name,
            campus_area:`${item.campus_area}校区`,
            the_hours:item.the_hours,
            exp_hours:item.exp_hours,
            class:_class,
            teacher:item.teacher
          }) 
        })
      })
    },

  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.course{
  width: 100%;
  .course_group{
    padding: 0 7%;
    margin: 1.5rem 0;
  }
}
</style>
