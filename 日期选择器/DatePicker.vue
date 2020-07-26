<template>
  <div class="data-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text" :value="chooseDate" />
    </div>
    <div class="picker-panel" v-if="changePanel">
      <div class="picker-arrow"></div>
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" @click="changeYear(-1)"></span>
          <span class="picker-btn iconfont icon-prev-month" @click="changeMonth(-1)"></span>
          <span class="picker-date">{{ showDate.year }}年{{ showDate.month+1 }}月</span>
          <span class="picker-btn iconfont icon-next-month" @click="changeMonth(1)"></span>
          <span class="picker-btn iconfont icon-next-year" @click="changeYear(1)"></span>
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div v-for="week in ['日','一','二','三','四','五','六']" :key="week">{{ week }}</div>
          </div>
          <div class="picker-days">
            <div
              v-for="day in showDay"
              :key="day.getTime()"
              class
              :class="{
				'other-month':!isCurrentDay(day).isMonth,
				'is-today':isCurrentDay(day).isToday,
				'is-select':isCurrentDay(day).isSelected
			}"
              @click="changeChooseDate(day)"
            >{{ day.getDate() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    "click-outside": {
      bind(el, binding, vnode) {
        const vm = vnode.context;
        document.onclick = function (e) {
          const dom = e.target;
          const elementChild = el.contains(dom);
          if (!vm.changePanel && elementChild) {
            vm.changePanel = true;
          } else if (vm.changePanel && !elementChild) {
            vm.changePanel = false;
          }
        };
      },
    },
  },
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      showDate: { year: 0, month: 0, day: 0 },
      changePanel: false,
    };
  },
  // 以下代码可以与父组件中的属性与事件进行绑定，父组件中就不再需要绑定子组件抛出的事件了
  //   mode: {
  //     prop: "date",
  //     event: "choose-date",
  //   },
  computed: {
    chooseDate() {
      const { year, month, day } = this.getYearMonthDay(this.date);
      return `${year}-${month + 1}-${day}`;
    },
    showDay() {
      const { year, month } = this.showDate;
      const firstDay = new Date(year, month, 1);
      //获得本月第一天为周几，获得到的week为数字
      const week = firstDay.getDay();
      //因为设置了本月的第一天为数组中的第一个索引下的值，想要对应日历中的周几需要
      //减掉前面的天数
      const startDay = firstDay - week * 24 * 60 * 60 * 1000;
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
  },
  methods: {
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year: year,
        month: month,
        day: day,
      };
    },
    getShowDate(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year: year,
        month: month,
        day: day,
      };
    },
    changeMonth(type) {
      const { year, month, day } = this.showDate;
      const standardTime = new Date(year, month, day);
      //month + type 为-1表示去年的最后一个月
      standardTime.setMonth(month + type);
      const { year: changedYear, month: changedMonth } = this.getYearMonthDay(
        standardTime
      );
      this.showDate.year = changedYear;
      this.showDate.month = changedMonth;
    },
    changeYear(type) {
      this.showDate.year += type;
    },
    isCurrentDay(date) {
      //现在的年月日
      const {
        year: curYear,
        month: curMonth,
        day: curDay,
      } = this.getYearMonthDay(new Date());
      //日历中展示的年月日
      const { year: showYear, month: showMonth } = this.showDate;
      //自己所点击选择的日期
      const {
        year: chooseYear,
        month: chooseMonth,
        day: chooseDay,
      } = this.getYearMonthDay(new Date(this.chooseDate));
      const { year, month, day } = this.getYearMonthDay(date);
      return {
        isMonth: year === showYear && month === showMonth,
        isToday: year === curYear && month === curMonth && day === curDay,
        isSelected:
          year === chooseYear && month === chooseMonth && day === chooseDay,
      };
    },
    changeChooseDate(date) {
      this.$emit("choose-date", date);
      this.changePanel = false;
      this.getShowDate(date);
    },
  },
  created() {
    this.getShowDate(this.date);
  },
};
</script>

<style scoped>
@import "./assets/font.css";
.data-picker {
  display: inline-block;
}
.picker-input {
  position: relative;
}
.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  color: #c0c4cc;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.picker-panel {
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: absolute;
}
.picker-panel .picker-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
  top: -12px;
  left: 30px;
}
.picker-panel .picker-arrow::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  left: -6px;
  top: 1px;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}
.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0 10px;
}
.picker-panel .picker-date {
  margin: 0 60px;
  font-size: 14px;
  user-select: none;
}
.picker-panel .picker-btn {
  margin: 0 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}
.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}
.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}
.picker-panel .picker-days div:hover {
  color: #409eff;
}
.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}
.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}
.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>