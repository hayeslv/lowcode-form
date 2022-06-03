import { ref } from "vue";

export function useDragging() {
  const dragging = ref(null as any);

  const setDraggingValue = (element) => {
    dragging.value = element;
  };

  return {
    dragging,
    setDraggingValue,
  };
}
