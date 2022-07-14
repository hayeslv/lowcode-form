import { computed, ref } from "vue";
// 使用组件配置（data中的json）

import { Global } from "~/config";
import { loadComponentMap } from "~/data";
import { FormNode } from "~/lowform-meta/instance/Node";
import type { IBaseNode, IFormNodeInstance } from "~/lowform-meta/type";
import { useForm, useGlobalId, useLocalStorage, useNodeList } from "~/hooks";

const { getMaxId } = useNodeList();
const { setGlobalId } = useGlobalId();
const { initForm } = useForm();

const config = ref({} as Record<string, IBaseNode>);

// 加载组件列表（编辑器中的组件）
const loadNodeList = () => {
  const { getItemJson } = useLocalStorage();
  const { coverNodeList } = useNodeList();
  // 获取缓存中的nodeList
  const nodeList = getItemJson(Global.NameNodeList);
  if (!nodeList) return;
  // 页面实例
  const FormNodeList = nodeList
    .map((node: Omit<IFormNodeInstance, "render">) => ({ // 将“加载组件”中对应key组件的render函数拿出，并拼接到node上
      render: config.value[node.key].render,
      ...node,
    }))
    .map((node: IFormNodeInstance) => new FormNode(node));
  coverNodeList(FormNodeList);
  // 初始化NodeList后，再初始化Form
  initForm();
};

export function useComponentMap() {
  const configComputed = computed(() => config.value);
  const initComponentMap = () => {
    loadComponentMap().then(componentMap => {
      config.value = componentMap;
      loadNodeList();
      // 更新最大节点id
      setGlobalId(getMaxId());
    });
  };

  return { config: configComputed, initComponentMap };
}
