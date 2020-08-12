<template>
  <div>
    <span class="name">按省份选择</span>
    <my-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change-active="changeProvinceActive"
      @change="changeProvince"
      className="province"
    />
    <my-select
      :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change-active="changeCityActive"
      @change="changeCity"
      className="city"
      :disabled="cityDisabled"
    />
    <span>直接搜索:</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入城市中文或拼音"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
import mySelect from './select.vue';
import api from '@/api/index.js';
export default {
  components: {
    mySelect
  },
  data() {
    return {
      provinceList: [],
      province: '省份',
      cityList: [],
      city: '城市',
      provinceActive: false,
      cityActive: false,
      searchList: ['哈尔滨', '佳木斯', '牡丹江', '鹤岗'],
      searchWord: '',
      loading: false,
      cityDisabled: true
    };
  },
  methods: {
    changeProvinceActive(value) {
      this.provinceActive = value;
      if (value) {
        this.cityActive = false;
      }
    },
    changeCityActive(value) {
      this.cityActive = value;
      if (value) {
        this.provinceActive = false;
      }
    },
    changeProvince(value) {
      this.province = value.name;
      this.cityDisabled = false;
      this.cityList = value.cityInfoList;
    },
    changeCity(value) {
      this.city = value.name;
      this.$store.dispatch('setPosition', value);
      this.$router.push({ path: 'index' });
    },
    remoteMethod() {
      // 可以接受一个参数，参数为搜索框中输入的值，可以传给后端获取列表
    }
  },
  created() {
    api.getProvinceList().then((res) => {
      console.log(res);
      this.provinceList = res.data.data.map((item) => {
        item.name = item.provinceName;
        return item;
      });
      console.log(this.provinceList);
    });
  }
};
</script>

<style lang="scss">
@import '@/assets/css/changeCity/iselect.scss';
</style>
