<template>
<el-aside style="width:auto;">
  <div class="navbar">
    <div class="switch">
      <el-switch v-model="isCollapse"></el-switch>
    </div>
    <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">教学任务</span>
        </template>
        <el-menu-item-group>
          <router-link to="/teachingTask">
            <el-menu-item index="1-1">
              大学城校区
            </el-menu-item>
          </router-link>
          <router-link to="/teachingTask">
            <el-menu-item index="1-2">
              中山校区
            </el-menu-item>
          </router-link>
          <router-link to="/teachingTask">
            <el-menu-item index="1-3">
              云浮校区
            </el-menu-item>
          </router-link>
          <router-link to="/teachingTask">
            <el-menu-item index="1-4">
              赤岗校区
            </el-menu-item>
          </router-link>
          <router-link to="/summarizing">
            <el-menu-item index="1-5">
              汇总
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link :to="{name:'teacherInfo'}">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">教师信息</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{name:'course'}">
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">课酬管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to="{name:'remuneration'}">
            <el-menu-item index="4-1">
              个人工作量
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- <router-link :to="{name:'remuneration'}">
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">课酬管理</span>
        </el-menu-item>
      </router-link> -->
      <router-link :to="{name:'calculation'}">
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">公式集合</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</el-aside>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  height: 88vh;
  width: auto;
}

.navbar {
  height: 100%;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 100%;
    height: 100%;
  }

  .el-menu {
    height: 100%;
    .el-submenu .el-menu-item{
      min-width:80px;
    }
  }
}
</style>
<style>
.switch {
  position: absolute;
  top: 20px;
  left: 15px;
  z-index: 100;
}
</style>
