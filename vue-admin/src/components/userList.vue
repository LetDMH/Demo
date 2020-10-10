<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'date', order: 'descending' }"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="注册日期:">
            <span>{{ props.row['注册日期'] }}</span>
          </el-form-item>
          <el-form-item label="用户姓名:">
            <span>{{ props.row['用户姓名'] }}</span>
          </el-form-item>
          <el-form-item label="用户地址:">
            <span>{{ props.row['用户地址'] }}</span>
          </el-form-item>
          <el-form-item label="联系电话:">
            <span>{{ props.row['联系电话'] }}</span>
          </el-form-item>
          <el-form-item label="邮箱:">
            <span>{{ props.row['邮箱'] }}</span>
          </el-form-item>
          <el-form-item label="其他信息:">
            <span>{{ props.row['其他信息'] }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column prop="注册日期" label="注册日期" sortable width="180">
    </el-table-column>
    <el-table-column prop="用户姓名" label="用户姓名" sortable width="180">
    </el-table-column>
    <el-table-column prop="用户地址" label="用户地址" :formatter="formatter">
    </el-table-column>
    <el-table-column label="操作">
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
</template>

<script>
import $http from "@/api/request";
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          date: "2016-05-02",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          date: "2016-05-02",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          date: "2016-05-02",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          date: "2016-05-02",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
  methods: {
    formatter(row) {
      return row['用户地址'];
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  created() {
    $http({
      url: "/mock/userinfo",
      method: "get",
    }).then(res=>{
      console.log(res)
      this.tableData = res.data.data
    });
  },
};
</script>

<style lang="scss" >
.demo-table-expand {
  font-size: 0;
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    .el-form-item__label {
      width: 90px;
      color: #99a9bf;
    }
  }
}
</style>