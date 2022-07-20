import { useNodeList } from "~/hooks";
import { ref, toRaw, watch } from "vue";
import type { FormNode, FormSelectNode } from "~/lowform-meta/instance/Node";
import { EventName } from "~/config";
import { events } from "~/plugins/events";

const { includeNode, getNodeList } = useNodeList();

const activeNode = ref(null as FormNode | FormSelectNode | null);

watch(() => activeNode.value, () => {
  events.emit(EventName.ActiveNodeUpdate, (activeNode.value as FormNode));
}, { deep: true });

events.on(EventName.NodeListUpdate, () => {
  // 当nodeList发生变化时，
  // 如果当前activeNode为空，或者当前activeNode不存在于nodeList中，
  // 就将nodeList中的第一个节点赋值给activeNode
  if (activeNode.value === null || !includeNode(activeNode.value as FormNode)) {
    const nodeList = getNodeList();
    activeNode.value = nodeList[0] || null;
  }
});

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
