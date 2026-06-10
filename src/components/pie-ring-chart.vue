<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { graphic } from "echarts/core";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent]);

interface PieDataItem {
  name: string;
  value: number;
  colorFrom: string;
  colorTo: string;
}

interface Props {
  /** 环形图数据 */
  data: PieDataItem[];
  /** 中心总数 */
  total: number;
  /** 中心总数标签 */
  totalLabel?: string;
  /** 图表大小 */
  radius?: [string, string];
  /** 标签是否显示 */
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  totalLabel: "总数",
  radius: () => ["40%", "70%"],
  showLabel: true,
});

const chartRef = ref<InstanceType<typeof VChart> | null>(null);
const scale = ref(1);
const option = ref({});

const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};

const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: [`{value|${props.total}}`, `{name|${props.totalLabel}}`].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#00d4ff",
            fontSize: 24 * scale.value,
            fontWeight: "bold",
            lineHeight: 20 * scale.value,
            padding: [4, 0, 4, 0],
            textShadowColor: "rgba(0,212,255,0.5)",
            textShadowBlur: 8,
          },
          name: {
            color: "#8cbce6",
            fontSize: 12 * scale.value,
            lineHeight: 20 * scale.value,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(6,35,77,0.9)",
      borderColor: "rgba(0,212,255,0.4)",
      textStyle: { color: "#e0f0ff", fontSize: 12 * scale.value },
    },
    series: [
      {
        name: "用户总览",
        type: "pie",
        radius: [20, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(0,212,255,0.15)",
          borderWidth: 1,
          shadowColor: "rgba(0,212,255,0.2)",
          shadowBlur: 10,
        },
        color: props.data.map((d) => echartsGraphic([d.colorFrom, d.colorTo])),
        label: props.showLabel
          ? {
              show: true,
              formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
              rich: {
                b: {
                  color: "#8cbce6",
                  fontSize: 11 * scale.value,
                  lineHeight: 22 * scale.value,
                },
                c: {
                  color: "#00d4ff",
                  fontSize: 13 * scale.value,
                  fontWeight: "bold",
                },
                per: {
                  color: "#00d4ff",
                  fontSize: 13 * scale.value,
                },
              },
            }
          : { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0,212,255,0.5)",
          },
        },
        legend: { show: false },
        tooltip: { show: true },
        labelLine: {
          show: props.showLabel,
          length: 16 * scale.value,
          length2: 28 * scale.value,
          smooth: 0.2,
          lineStyle: { color: "rgba(0,212,255,0.3)" },
        },
        data: props.data.map((d) => ({
          value: d.value,
          name: d.name,
          itemStyle: {
            color: echartsGraphic([d.colorFrom, d.colorTo]),
          },
        })),
      },
    ],
  };
};

const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.05 : 0.05;
  scale.value = Math.max(0.5, Math.min(2, scale.value + delta));
  setOption();
};

watch(
  () => [props.data, props.total],
  () => setOption(),
  { deep: true, immediate: true }
);

onMounted(() => {
  const el = chartRef.value?.$el;
  if (el) {
    el.addEventListener("wheel", handleWheel, { passive: false });
  }
});

onUnmounted(() => {
  const el = chartRef.value?.$el;
  if (el) {
    el.removeEventListener("wheel", handleWheel);
  }
});
</script>

<template>
  <v-chart ref="chartRef" class="chart" :option="option" />
</template>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
