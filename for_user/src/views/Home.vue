<template>
  <div class="home">
    <router-view class="route" />
    <tab-bar class="tab_bar"></tab-bar>
  </div>
</template>

<script>
import tab_bar from '@/components/tab_bar.vue'

export default {
  name: "home",
  components: {
    'tab-bar':tab_bar
  },
  mounted () {
    let self = this
    let user_info = self.Bmob.User.current()
    window.user_info = user_info
    console.log(JSON.stringify(user_info))
    console.log(JSON.parse(JSON.stringify(user_info)))
    localStorage.setItem('teacher_id',user_info.teacher_id)
    localStorage.setItem('user_info',JSON.stringify(user_info))
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
  width: 100%;
  .route{
    z-index: 10;
  }
  .tab_bar{
    z-index: 100;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>

