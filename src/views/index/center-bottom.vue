<script setup lang="ts">
import { ref, onMounted } from "vue";
import { installationPlan } from "@/api";
import { ElMessage } from "element-plus";
import BarLineChart from "@/components/bar-line-chart.vue";

const chartData = ref<any>(null);

const getData = () => {
  installationPlan()
    .then((res) => {
      console.log("中下--安装计划", res);
      if (res.success) {
        chartData.value = res.data;
      } else {
        ElMessage({ message: res.msg, type: "warning" });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
onMounted(() => {
  getData();
});
</script>

<template>
  <BarLineChart v-if="chartData" :data="chartData" />
</template>

<style scoped lang="scss"></style>
