<template>
  <section>
    <header>
      <h1>用户分布</h1>
    </header>
    <div class="charts">
      <div id="pie"></div>
      <div id="dualAxes"></div>
    </div>
  </section>
</template>

<script>
import { Pie, DualAxes } from "@antv/g2plot";
export default {
  data() {
    return {
      pieData: [
        { type: "北京", value: 178 },
        { type: "上海", value: 76 },
        { type: "深圳", value: 83 },
        { type: "杭州", value: 45 },
        { type: "广州", value: 79 },
        { type: "其他", value: 539 },
      ],
      dualAxesData: [
        { type: "北京", value: 178, count: 178 },
        { type: "上海", value: 76, count: 76 },
        { type: "深圳", value: 83, count: 83 },
        { type: "杭州", value: 45, count: 45 },
        { type: "广州", value: 79, count: 79 },
        { type: "其他", value: 539, count: 539 },
      ],
    };
  },
  methods: {
    piePlot() {
      return new Pie("pie", {
        appendPadding: 10,
        data: this.pieData,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: {
          type: "spider",
          content: "{name}\n{percentage}",
        },
      });
    },
    dualAxesChart() {
      return new DualAxes("dualAxes", {
        data: [this.dualAxesData, this.dualAxesData],
        xField: "type",
        yField: ["value", "count"],
        yAxis: [
          // 格式化左坐标轴
          {
            min: 0,
            label: {
              formatter: (val) => `${val}人`,
            },
          },
          // 隐藏右坐标轴
          false,
        ],
        geometryOptions: [
          {
            geometry: "column",
            color: "#586bce",
            columnWidthRatio: 0.4,
            columnStyle: {
              opacity: 0.4,
            },
            label: {
              position: "middle",
            },
          },
          {
            geometry: "line",
            color: "#29cae4",
          },
        ],
        // 更改柱线交互，默认为 [{type: 'active-region'}]
        interactions: [
          {
            type: "element-highlight",
          },
          {
            type: "active-region",
          },
        ],
      });
    },
  },
  mounted() {
    this.piePlot().render();
    this.dualAxesChart().render();
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 40px;
}
.charts {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  #pie {
    height: 400px;
    width: 500px;
  }
  #dualAxes {
    height: 400px;
    width: 500px;
  }
}
</style>