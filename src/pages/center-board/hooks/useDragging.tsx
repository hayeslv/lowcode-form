import { ref } from "vue";
import type { ElementComponent } from "~/config";

export function useDragging() {
  const dragging = ref(null as ElementComponent | null);

  const setDraggingValue = (element: ElementComponent | null) => {
    dragging.value = element;
  };

  return {
    dragging,
    setDraggingValue,
  };
}
