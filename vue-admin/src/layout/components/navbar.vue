<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click" @command="dropDown">
      <span class="el-dropdown-link">
        <img src="@/assets/avatar.jpg" class="avatar" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  methods:{
    async dropDown(command){
      if(command === 'home'){
        this.$router.push('/home')
      }else if(command === 'logout'){  
        // await this.$store.dispatch('logout');
        this.$router.push('/login')      
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 60px;
  width: 100%;
  background-color: #eff2f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-breadcrumb {
    padding-left: 20px;
  }
  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    margin-right: 20px;
  }
  .el-dropdown{
    cursor: pointer;
  }
}
</style>