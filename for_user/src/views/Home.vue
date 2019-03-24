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
    localStorage.setItem('teacher_id',user_info.teacher_id)
    localStorage.setItem('user_uuid',user_info.objectId)
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

