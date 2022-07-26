import { createApp } from "vue";
import router from "./router";
import element from "element-plus";
import "element-plus/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn"; // 中文
import "virtual:svg-icons-register";
import "./plugins/events";
// import * as Icons from "@element-plus/icons-vue";
import App from "./App";

import SvgIcon from "~/components/SvgIcon"; // icon图标

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.use(element, { locale });
app.use(router);
app.mount("#app");
