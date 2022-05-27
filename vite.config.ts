import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  base: "/", // 项目部署的基础路径
  publicDir: "public", // 静态资源服务文件夹
  resolve: {
    alias: {
      "~": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue({ reactivityTransform: true }),
    VueJsx(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        /* 引入var.scss全局预定义变量，多个：'@import "xxx";@import "xxx' */
        additionalData: "@import '~/style/global.scss';",
      },
    },
  },
});
