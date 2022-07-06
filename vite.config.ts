import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // icon图标

export default defineConfig({
  base: "/", // 项目部署的基础路径
  publicDir: "public", // 静态资源服务文件夹
  define: {
    __DEV__: process.env.NODE_ENV === "development",
  },
  resolve: {
    alias: {
      "~": `${path.resolve(__dirname, "src")}/`,
    },
    extensions: [".js", ".ts", ".tsx", ".vue", ".json"],
  },
  plugins: [
    Vue({ reactivityTransform: true }),
    VueJsx(),
    // 获取全部 SymbolId ： import ids from 'virtual:svg-icons-names'
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
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
