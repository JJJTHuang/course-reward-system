<template>
<el-header>
  <div class="header">
    <div class="left">
      <router-link to="/">
        <h1>🐷课程及酬金管理系统</h1>
      </router-link>
    </div>
    <div class="right">
      <span class="admin">admin</span>
      <el-button type="primary">signout</el-button>
    </div>
  </div>
</el-header>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid $first-border;

  .header {
    width: 100%;
    height: 60px;
    padding: 0 10px 0 60px;
    box-sizing: border-box;

    .left,
    .right {
      height: 60px;
      line-height: 60px;
    }

    .left {
      float: left;

      h1 {
        font-size: 20px;
      }
    }

    .right {
      float: right;

      .admin {
        margin-right: 20px;
      }
    }
  }
}
</style>
