import { ref } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";

const dragging = ref(null as FormNode | null);

export function useDragging() {
  const getDragging = () => {
    return dragging.value;
  };

  const setDraggingValue = (element: FormNode | null) => {
    dragging.value = element;
  };

  const setDraggingValueAsync = (element: FormNode | null) => {
    setTimeout(() => { // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
      setDraggingValue(element);
    });
  };

  return {
    getDragging,
    setDraggingValue,
    setDraggingValueAsync,
  };
}
