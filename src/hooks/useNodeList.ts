import { events } from "~/plugins/events";
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { EventName, Global } from "~/config";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { useLocalStorage } from "./useLocalStorage";

/**
 * @Descripttion: 编辑器中的节点（组件）
 */

const { setItem } = useLocalStorage();
const nodeList = ref([] as FormNode[]);

// 节点列表发生更新
watch(() => nodeList.value, debounce(() => {
  // 更新缓存中的值
  const list = nodeList.value.map(v => v.getJson());
  setItem(Global.NameNodeList, list);
  // 发送通知
  events.emit(EventName.NodeListUpdate);
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

  const clearNodeList = () => {
    nodeList.value = [];
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

  // 删除节点
  const deleteNode = (node: FormNode) => {
    if (!includeNode(node)) return; // 节点不存在列表中
    const index = nodeList.value.findIndex(v => v.instance.id === node.instance.id);
    nodeList.value.splice(index, 1);
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
    if (nodeList.value.length === 0) return null;
    return Math.max(...nodeList.value.map(v => v.instance.id));
  };

  return {
    addNode,
    deleteNode,
    getNodeList,
    includeNode,
    swapNodes,
    coverNodeList,
    getMaxId,
    clearNodeList,
  };
}
