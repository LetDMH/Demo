<template>
  <div>
    <div class="button-wrapper">
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>
    <el-table :data="changeData" style="width: 100%">
      <el-table-column label="员工" prop="name"> </el-table-column>
      <el-table-column label="职责" prop="duty"> </el-table-column>
      <el-table-column label="备注" prop="remark"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入需要搜索的姓名"
            :msg="scope.row"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="changedDetails"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      pageSize: 10,
      downloadLoading: false,
    };
  },
  props: ["details"],
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["员工", "职责", "备注"];
        const filterVal = ["name", "duty", "remark"];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.details.map((v) => filterVal.map((j) => v[j]));
    },
  },
  computed: {
    changeData() {
      if (this.search == "") {
        return this.details.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      } else {
        return this.details.filter(
          (data) =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    changedDetails() {
      return this.details.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      ).length;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  .filter-item {
    margin: 0 20px;
  }
}
</style>