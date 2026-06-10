<script setup lang="ts">
import { ref, onMounted } from "vue";
import { alarmNum } from "@/api";
import { ElMessage } from "element-plus";
import LineAreaChart from "@/components/line-area-chart.vue";

const xData = ref<string[]>([]);
const seriesData = ref<any[]>([]);

const getData = () => {
  alarmNum()
    .then((res) => {
      console.log("右上--报警次数 ", res);
      if (res.success) {
        xData.value = res.data.dateList;
        seriesData.value = [
          { name: "报警1次数", data: res.data.numList, color: "rgba(252,144,16,.7)" },
          { name: "报警2次数", data: res.data.numList2, color: "rgba(9,202,243,.7)" },
        ];
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
  <LineAreaChart v-if="xData.length" :x-data="xData" :series="seriesData" />
</template>

<style scoped lang="scss"></style>
