import { ref, toRaw } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";

const activeNode = ref(null as FormNode | null);

export function useActiveNode() {
  const getActiveNode = () => {
    return toRaw(activeNode.value);
  };

  const setActiveNode = (element: FormNode | null) => {
    activeNode.value = element;
  };

  return {
    getActiveNode,
    setActiveNode,
  };
}
