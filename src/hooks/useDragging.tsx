import { ref } from "vue";
import type { ElementComponent } from "~/config";

const dragging = ref(null as ElementComponent | null);

export function useDragging() {
  const setDraggingValue = (element: ElementComponent | null) => {
    dragging.value = element;
  };

  const setDraggingValueAsync = (element: ElementComponent | null) => {
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
