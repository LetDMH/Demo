<template>
  <div class="wrapper">
    <el-menu
      :default-active="defaultActive"
      style="min-height: 100%; background-color: #324057"
      active-text-color="#20A0ff"
      text-color="#bfcbd9"
      router
    >
      <el-menu-item index="home" class="not-active"><i class="el-icon-menu"></i>首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title"
          ><i class="el-icon-document"></i>数据管理</template
        >
        <el-menu-item index="userList">用户列表</el-menu-item>
        <el-menu-item index="shopList">商家列表</el-menu-item>
        <el-menu-item index="adminList">管理员列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-document"></i>绩效管理</template>
        <el-menu-item index="duty">工作职责</el-menu-item>
        <el-menu-item index="performance">我的绩效</el-menu-item>
        <el-menu-item index="assessment">考核总览</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-star-on"></i>图表</template>
        <el-menu-item index="visitor">用户分布</el-menu-item>
        <el-menu-item index="newMember">富文本编辑器</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>设置</template>
        <el-menu-item index="adminSet">管理员设置</el-menu-item>
        <el-menu-item index="sendMessage">发送通知</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-warning"></i>说明</template>
        <el-menu-item index="explain">说明</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>
<style lang="scss">
.el-menu {
  &>li.is-active{
    background-color:#324057;
  }
  .el-submenu__title:hover {
    background-color: #48576a;
  }
  .el-menu-item {
    i {
      color: #bfcbd9;
    }
  }
  .el-menu-item.is-active:not(.not-active){
    background-color: #1f2d3d;
  }
  .el-menu-item:hover {
    background-color: #48576a;
  }
  .el-submenu {
    .el-menu {
      background-color: #1f2d3d;
    }
    .el-submenu__title {
      i {
        color: #bfcbd9;
        font-weight: 500;
      }
    }
    .el-menu--inline {
      background-color: #1f2d3d;
    }
  }
}
.wrapper .el-menu{
  border: none;
}
</style>