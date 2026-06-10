<script setup lang="ts">
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <border-box-8 class="contetn_left-top contetn_lr-item"  >
        <div class="box-title">设备总览</div>
        <LeftTop />
      </border-box-8>
      <border-box-8 class="contetn_left-center contetn_lr-item"  >
        <div class="box-title">用户总览</div>
        <LeftCenter />
      </border-box-8>
      <border-box-8 class="contetn_left-bottom contetn_lr-item"  >
        <div class="box-title">设备提醒</div>
        <LeftBottom />
      </border-box-8>
    </div>
    <div class="contetn_center">
      <border-box-8 class="contetn_center-top"  >
        <!-- <div class="box-title">设备分布图</div> -->
        <CenterMap :title="'设备分布图'" />
      </border-box-8>
      <border-box-8 class="contetn_center-bottom"  >
        <div class="box-title">安装计划</div>
        <CenterBottom />
      </border-box-8>
    </div>
    <div class="contetn_right">
      <border-box-8 class="contetn_left-bottom contetn_lr-item"  >
        <div class="box-title">报警次数</div>
        <RightTop />
      </border-box-8>
      <border-box-8 class="contetn_left-bottom contetn_lr-item" >
        <div class="box-title">报警排名(TOP8)</div>
        <RightCenter />
      </border-box-8>
      <border-box-8 class="contetn_left-bottom contetn_lr-item">
        <div class="box-title">数据统计图</div>
        <RightBottom />
      </border-box-8>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}

// 左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .contetn_center-top {
    height: calc(100% - 315px - 20px);
  }

  .contetn_center-bottom {
    height: 315px;
    padding: 20px;
  }
}

.contetn_lr-item {
  height: 310px;
  padding: 20px;
}

// 标题样式
.box-title {
  // position: absolute;
  top: 0px;
  left: 0px;
  font-size: 15px;
  font-weight: 700;
  color: #e0f0ff;
  letter-spacing: 1px;
  z-index: 10;
  pointer-events: none;
}

</style>
