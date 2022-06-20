import { createApp } from "vue";
import router from "./router";
import "element-plus/theme-chalk/index.css";
import "virtual:svg-icons-register";
import App from "./App.vue";

import SvgIcon from "~/components/SvgIcon"; // icon图标

// import ElementPlus from "element-plus";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

// app.use(ElementPlus);
app.use(router);
app.mount("#app");
