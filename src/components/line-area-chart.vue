<script setup lang="ts">
import { ref, watch } from "vue";
import { graphic } from "echarts/core";

interface LineSeries {
  name: string;
  data: number[];
  color: string;
}

interface Props {
  /** X 轴数据 */
  xData: string[];
  /** 折线系列数据 */
  series: LineSeries[];
  /** 网格配置 */
  grid?: { left?: string; right?: string; bottom?: string; top?: string };
}

const props = withDefaults(defineProps<Props>(), {
  grid: () => ({ left: "10px", right: "30px", bottom: "10px", top: "32px" }),
});

const option = ref({});

const buildSeries = (s: LineSeries) => {
  const rgb = s.color.replace(/rgba?\(([^)]+)\)/, "$1");
  return {
    data: s.data,
    type: "line",
    smooth: true,
    symbol: "none",
    name: s.name,
    color: s.color,
    areaStyle: {
      color: new graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: s.color },
        { offset: 1, color: s.color.replace(/[\d.]+\)$/, "0)") },
      ]),
    },
    markPoint: {
      data: [
        {
          name: "最大值",
          type: "max",
          valueDim: "y",
          symbol: "rect",
          symbolSize: [60, 26],
          symbolOffset: [0, -20],
          itemStyle: { color: "rgba(0,0,0,0)" },
          label: {
            color: s.color,
            backgroundColor: s.color.replace(/[\d.]+\)$/, "0.1)"),
            borderRadius: 6,
            padding: [7, 14],
            borderWidth: 0.5,
            borderColor: s.color.replace(/[\d.]+\)$/, "0.5)"),
            formatter: `${s.name}：{c}`,
          },
        },
        {
          name: "最大值",
          type: "max",
          valueDim: "y",
          symbol: "circle",
          symbolSize: 6,
          itemStyle: { color: s.color, shadowColor: s.color, shadowBlur: 8 },
          label: { formatter: "" },
        },
      ],
    },
  };
};

const setOption = (xData: string[], series: LineSeries[]) => {
  option.value = {
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false,
      splitLine: { show: true, lineStyle: { color: "rgba(31,99,163,.2)" } },
      axisLine: { lineStyle: { color: "rgba(31,99,163,.1)" } },
      axisLabel: { color: "#7EB7FD", fontWeight: "500" },
    },
    yAxis: {
      type: "value",
      splitLine: { show: true, lineStyle: { color: "rgba(31,99,163,.2)" } },
      axisLine: { lineStyle: { color: "rgba(31,99,163,.1)" } },
      axisLabel: { color: "#7EB7FD", fontWeight: "500" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: { color: "#FFF" },
    },
    grid: {
      show: true,
      left: props.grid.left,
      right: props.grid.right,
      bottom: props.grid.bottom,
      top: props.grid.top,
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: series.map(buildSeries),
  };
};

watch(
  () => [props.xData, props.series],
  ([xData, series]) => setOption(xData as string[], series as LineSeries[]),
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
