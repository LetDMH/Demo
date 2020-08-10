<template>
  <div class="page-changeCity">
    <el-row>
      <province />
    </el-row>
    <el-row>
      <hot-city title="热门城市:" :list="hotList" />
    </el-row>
    <el-row>
      <hot-city title="最近访问:" :list="rencentList" />
    </el-row>
    <el-row>
      <category />
    </el-row>
  </div>
</template>

<script>
import province from '@/components/changeCity/province.vue';
import hotCity from '@/components/changeCity/hot.vue';
import category from '@/components/changeCity/category.vue';
import api from '@/api/index.js';
export default {
  components: {
    province,
    hotCity,
    category
  },
  data() {
    return {
      hotList: [],
      rencentList: []
    };
  },
  created() {
    api.getHotCity().then((res) => {
      this.hotList = res.data.data.map((item) => item.name);
    });
    api.getRecentCity().then((res) => {
      this.rencentList = res.data.data.map((item) => item.name);
    });
  }
};
</script>
