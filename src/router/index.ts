import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // 进度条样式

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: "/editor",
    name: "Page",
    component: () => import("~/pages/page"),
  },
  {
    path: "/",
    name: "Editor",
    component: () => import("~/pages/editor"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start(); // start progress bar
  return true;
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
