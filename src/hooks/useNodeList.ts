import { ref, watch } from "vue";
import { debounce } from "lodash";
import { Global } from "~/config";
/**
 * @Descripttion: 编辑器中的节点（组件）
 */

import type { FormNode } from "~/lowform-meta/instance/Node";
import { useLocalStorage } from "./useLocalStorage";

const { setItem } = useLocalStorage();
const nodeList = ref([] as FormNode[]);

// 实时保存nodelist
watch(() => nodeList.value, debounce(() => {
  const list = nodeList.value.map(v => v.getJson());
  setItem(Global.NameNodeList, list);
}, 300), { deep: true });

export function useNodeList() {
  // 获取节点列表
  const getNodeList = () => {
    return nodeList.value;
  };

  // 覆盖nodeList
  const coverNodeList = (list: FormNode[]) => {
    nodeList.value = list;
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

  // 节点交换位置
  const swapNodes = (dragging: FormNode, target: FormNode) => {
    if (target.transiting) return; // 目标元素正在进行动画
    if (dragging.instance.id === target.instance.id) return; // 不会和自己发生交换

    const index1 = nodeList.value.findIndex(v => v.instance.id === dragging.instance.id);
    const index2 = nodeList.value.findIndex(v => v.instance.id === target.instance.id);
    [nodeList.value[index1], nodeList.value[index2]] = [nodeList.value[index2], nodeList.value[index1]];

    target.transiting = true;
    setTimeout(() => {
      target.transiting = false;
    }, Global.TransitionTime);
  };

  // 获取nodeList的最大id
  const getMaxId = () => {
    return Math.max(...nodeList.value.map(v => v.instance.id));
  };

  return {
    addNode,
    getNodeList,
    includeNode,
    swapNodes,
    coverNodeList,
    getMaxId,
  };
}
