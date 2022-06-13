import { ref } from "vue";
import type { ElementComponent } from "~/config";

// 使用当前激活的组件
export const useActiveComp = (() => {
  const activeComp = ref(null as ElementComponent | null);
  return () => {
    // 获取激活组件的id
    const getActiveId = () => {
      return activeComp.value?.id;
    };
    // 获取激活组件
    const getActiveComp = () => {
      return activeComp.value;
    };
    // 设置激活组件
    const setActiveComp = (component: ElementComponent | null) => {
      activeComp.value = component;
    };

    return { getActiveId, getActiveComp, setActiveComp };
  };
})();
