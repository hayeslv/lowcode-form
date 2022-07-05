/**
 * @Descripttion: 编辑器中的节点（组件）
 */

import { ref } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";

const nodeList = ref([] as FormNode[]);

export function useNodeList() {
  const getNodeList = () => {
    return nodeList.value;
  };
  // 添加节点
  const addNode = (node: FormNode, anchor?: FormNode) => {
    if (!anchor) {
      nodeList.value.push(node);
      return;
    }
    // 获取anchor在 nodeList 中的位置
    const index = nodeList.value.findIndex(v => v.instance.id === anchor.instance.id);
    if (index === -1) return;
    // 在此位置前添加元素
    nodeList.value.splice(index, 0, node);
  };

  return { addNode, getNodeList };
}
