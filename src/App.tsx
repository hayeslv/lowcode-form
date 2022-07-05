
import { defineComponent, provide } from "vue";
import { RouterView } from "vue-router";
import { componentMap } from "~/data";
import { configKey } from "./config";
import "./style/common.scss";

export default defineComponent({
  setup() {
    provide(configKey, componentMap);
    return () => <RouterView></RouterView>;
  },
});
