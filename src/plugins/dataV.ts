import type { App } from "vue";
import {
  BorderBox1,
  BorderBox2,
  BorderBox3,
  BorderBox4,
  BorderBox5,
  BorderBox6,
  BorderBox7,
  BorderBox8,
  BorderBox9,
  BorderBox10,
  BorderBox11,
  BorderBox12,
  BorderBox13,
  Decoration1,
  Decoration2,
  Decoration3,
  Decoration4,
  Decoration5,
  Decoration6,
  Decoration7,
  Decoration8,
  Loading,
} from "@dataview/datav-vue3/es/index.mjs";

// 全局注册所有 DataV 组件（border-box / decoration / loading）
export const registerDataV = (app: App) => {
  // 边框
  app.component("BorderBox1", BorderBox1);
  app.component("BorderBox2", BorderBox2);
  app.component("BorderBox3", BorderBox3);
  app.component("BorderBox4", BorderBox4);
  app.component("BorderBox5", BorderBox5);
  app.component("BorderBox6", BorderBox6);
  app.component("BorderBox7", BorderBox7);
  app.component("BorderBox8", BorderBox8);
  app.component("BorderBox9", BorderBox9);
  app.component("BorderBox10", BorderBox10);
  app.component("BorderBox11", BorderBox11);
  app.component("BorderBox12", BorderBox12);
  app.component("BorderBox13", BorderBox13);
  // 装饰
  app.component("Decoration1", Decoration1);
  app.component("Decoration2", Decoration2);
  app.component("Decoration3", Decoration3);
  app.component("Decoration4", Decoration4);
  app.component("Decoration5", Decoration5);
  app.component("Decoration6", Decoration6);
  app.component("Decoration7", Decoration7);
  app.component("Decoration8", Decoration8);
  // 加载
  app.component("Loading", Loading);
};
