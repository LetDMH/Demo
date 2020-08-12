<template>
  <div class="m-header">
    <el-row>
        <top-bar/>
    </el-row>
    <el-row>
        <search-bar/>
    </el-row>
  </div>
</template>

<script>
import topBar from './topbar';
import searchBar from './searchbar';
export default {
  components: {
    topBar,
    searchBar
  }
};
</script>
