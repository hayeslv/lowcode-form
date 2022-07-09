import { ref, toRaw, watch } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { EventName } from "~/config";
import { events } from "~/plugins/events";

const activeNode = ref(null as FormNode | null);

watch(() => activeNode.value, () => {
  events.emit(EventName.ActiveNodeUpdate, (activeNode.value as FormNode));
}, { deep: true });

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
