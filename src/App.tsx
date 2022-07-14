
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useComponentMap } from "./hooks";
import "./style/common.scss";

export default defineComponent({
  setup() {
    const { initComponentMap } = useComponentMap();
    // 初始化组件配置map
    initComponentMap();

    return () => <RouterView></RouterView>;
  },
});
