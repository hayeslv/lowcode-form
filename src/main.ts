import { createApp } from "vue";
import router from "./router";
import "element-plus/theme-chalk/index.css";
import "virtual:svg-icons-register";
import "./plugins/GlobalEvent";
import App from "./App";

import SvgIcon from "~/components/SvgIcon"; // icon图标

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.use(router);
app.mount("#app");
