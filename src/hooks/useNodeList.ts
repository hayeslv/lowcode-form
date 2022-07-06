import { ref } from "vue";
/**
 * @Descripttion: 编辑器中的节点（组件）
 */

import type { FormNode } from "~/lowform-meta/instance/Node";

const nodeList = ref([] as FormNode[]);

export function useNodeList() {
  // 获取节点列表
  const getNodeList = () => {
    return nodeList.value;
  };
  // 添加节点
  const addNode = (node: FormNode, anchor?: FormNode) => {
    if (includeNode(node)) return; // 如果已经存在了，则不添加
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
  // 判断当前节点是否在列表中
  const includeNode = (node: FormNode) => {
    return nodeList.value.findIndex(v => v.instance.id === node.instance.id) >= 0;
  };

  return { addNode, getNodeList };
}
