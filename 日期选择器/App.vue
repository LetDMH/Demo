<template>
  <div id="app">
    <date-picker :date="date" @choose-date="changeChooseDate"></date-picker>
    <!-- <date-picker v-model="date"></date-picker> -->
  </div>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    changeChooseDate(date) {
      this.date = date;
    },
  },
};
</script>

<style scoped>
</style>