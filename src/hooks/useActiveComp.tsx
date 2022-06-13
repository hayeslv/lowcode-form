import { ref } from "vue";
import type { ElementComponent } from "~/config";

// 当前激活的组件
const activeComp = ref(null as ElementComponent | null);

export const useActiveComp = () => {
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
