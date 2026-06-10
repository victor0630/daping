<script setup lang="ts">
import { ref, watch } from "vue";
import { graphic } from "echarts/core";

interface BarLineData {
  category: string[];
  barData: number[];
  lineData: number[];
  rateData: number[];
}

interface Props {
  /** 图表数据 */
  data: BarLineData;
  /** 图例名称 */
  legendNames?: [string, string, string];
  /** 柱状图颜色渐变 */
  barColors?: [string, string];
  /** 折线图颜色 */
  lineColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  legendNames: () => ["已安装", "计划安装", "安装率"],
  barColors: () => ["#956FD4", "#3EACE5"],
  lineColor: "#F02FC2",
});

const option = ref({});

const setOption = (newData: BarLineData) => {
  option.value = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: { color: "#FFF" },
      formatter: function (params: any) {
        var result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.value) {
            if (item.seriesName === props.legendNames[2]) {
              result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
            } else {
              result += item.marker + " " + item.seriesName + " : " + item.value + "个</br>";
            }
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      },
    },
    legend: {
      data: props.legendNames,
      textStyle: { color: "#B4B4B4" },
      top: "0",
    },
    grid: { left: "50px", right: "40px", bottom: "30px", top: "20px" },
    xAxis: {
      data: newData.category,
      axisLine: { lineStyle: { color: "#B4B4B4" } },
      axisTick: { show: false },
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: { lineStyle: { color: "#B4B4B4" } },
        axisLabel: { formatter: "{value}" },
      },
      {
        splitLine: { show: false },
        axisLine: { lineStyle: { color: "#B4B4B4" } },
        axisLabel: { formatter: "{value}% " },
      },
    ],
    series: [
      {
        name: props.legendNames[0],
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: props.barColors[0] },
            { offset: 1, color: props.barColors[1] },
          ]),
        },
        data: newData.barData,
      },
      {
        name: props.legendNames[1],
        type: "bar",
        barGap: "-100%",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(156,107,211,0.8)" },
            { offset: 0.2, color: "rgba(156,107,211,0.5)" },
            { offset: 1, color: "rgba(156,107,211,0.2)" },
          ]),
        },
        z: -12,
        data: newData.lineData,
      },
      {
        name: props.legendNames[2],
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: { color: props.lineColor },
        data: newData.rateData,
      },
    ],
  };
};

watch(
  () => props.data,
  (newData) => setOption(newData),
  { deep: true, immediate: true }
);
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
