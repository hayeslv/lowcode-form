import { ref } from "vue";
import type { IComponent } from "~/types";

const dragging = ref(null as IComponent | null);

export function useDragging() {
  const setDraggingValue = (element: IComponent | null) => {
    dragging.value = element;
  };

  const setDraggingValueAsync = (element: IComponent | null) => {
    setTimeout(() => { // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
      setDraggingValue(element);
    });
  };

  return {
    dragging,
    setDraggingValue,
    setDraggingValueAsync,
  };
}
