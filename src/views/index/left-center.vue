<script setup lang="ts">
import { reactive, computed } from "vue";
import { countUserNum } from "@/api";
import { ElMessage } from "element-plus";
import PieRingChart from "@/components/pie-ring-chart.vue";

const state = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
});

const pieData = computed(() => [
  { name: "在线", value: state.onlineNum, colorFrom: "#00b894", colorTo: "#00d4ff" },
  { name: "离线", value: state.offlineNum, colorFrom: "#636e72", colorTo: "#b2bec3" },
  { name: "锁定", value: state.lockNum, colorFrom: "#e17055", colorTo: "#fdcb6e" },
  { name: "异常", value: state.alarmNum, colorFrom: "#d63031", colorTo: "#e84393" },
]);

const getData = () => {
  countUserNum()
    .then((res) => {
      console.log("左中--用户总览", res);
      if (res.success) {
        state.lockNum = res.data.lockNum;
        state.offlineNum = res.data.offlineNum;
        state.onlineNum = res.data.onlineNum;
        state.totalNum = res.data.totalNum;
        state.alarmNum = res.data.alarmNum;
      } else {
        ElMessage.error(res.msg);
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
getData();
</script>

<template>
  <PieRingChart :data="pieData" :total="state.totalNum" total-label="总数" />
</template>

<style scoped lang="scss"></style>
