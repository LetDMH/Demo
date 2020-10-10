<template>
    <section>
      <header>
        <h1>工作职责</h1>
      </header>
      <mySelect
        department="部门"
        :dataList="emitDepartment"
        @filterData="filter"
        @showDepartmentDetail="showDepartment"
      />
      <mySelect
        department="员工"
        :dataList="employeeList"
        @showEmployeeDetail="showEmployee"
      />
      <myTable :details="details" />
    </section>
</template>

<script>
import mySelect from "./utils/select";
import myTable from "./utils/table";
import $http from "@/api/request";
export default {
  components: {
    mySelect,
    myTable,
  },
  data() {
    return {
      departmentList: [],
      employeeList: [],
      details: [],
    };
  },
  methods: {
    filter(value) {
      this.employeeList = this.departmentList.filter((item) => {
        return item.department == value;
      });
    },
    showDepartment(value) {
      this.details = this.departmentList.filter((item) => {
        return item.department == value;
      });
    },
    showEmployee(value) {
      this.details = this.departmentList.filter((item) => {
        return item.name == value;
      });
    },
  },
  computed: {
    emitDepartment() {
      const map = new Map();
      const department = this.departmentList.filter((item) => {
        return map.has(item.department) ? false : map.set(item.department, 1);
      });
      return department;
    },
  },
  created() {
    $http({
      url: "/mock/employee.js",
      method: "get",
    }).then((res) => {
      this.departmentList = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 20px;
}
</style>