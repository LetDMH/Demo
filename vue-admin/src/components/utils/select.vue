<template>
  <div class="wrapper">
    <span>{{ department }}</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in dataList"
        :key="item.value"
        :value="getInfo(item)"
        @click.native="handler(item)"
      >
        {{ getInfo(item) }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  props: ["department", "dataList"],
  computed: {
    getInfo() {
      return (item) =>
        this.department == "部门" ? item.department : item.name;
    },
  },
  methods: {
    handler(item) {
      this.$emit("filterData", item.department);
      if(this.department == "部门" )this.$emit("showDepartmentDetail", item.department);
      else this.$emit("showEmployeeDetail", item.name)
    },
    // handleChange(){
    //   if(this.department == "部门"){
    //     this.value = ''
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  margin-left: 60px;
  .el-select {
    margin-left: 20px;
  }
}
</style>