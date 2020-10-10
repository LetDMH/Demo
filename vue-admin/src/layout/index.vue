<template>
  <div class="container">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057">
        <sidebar />
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <navbar />
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sidebar from "./components/sideBar";
import navbar from "@/layout/components/navbar";
export default {
  components: {
    sidebar,
    navbar
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .fade-transform-enter,.fade-transform-leave-to{
    opacity: 0;
  }
  .fade-transform-to,.fade-transform-leave{
    opacity: 1;
  }
  .fade-transform-enter-active,.fade-transform-leave-active{
    transition: all .3s;
  }
}
</style>