import type { FormNode, FormSelectNode } from "~/lowform-meta/instance/Node";
import { EOptionsDataType } from "~/lowform-meta/type";

export const selectMethods = {
  removeSelectOptions(node: FormNode, value: any) {
    const index = node.instance.options!.findIndex(v => v.value === value);
    node.instance.options?.splice(index, 1);
  },
  addSelectOption(node: FormNode) {
    node.instance.options?.push({ label: "", value: "" });
  },
  // 更新动态选项数据
  async updateDynamicOptions(node: FormSelectNode) {
    const instance = node!.instance;
    if (!instance.optionsDataType || instance.optionsDataType === EOptionsDataType.STATIC) return;
    try {
      const res = await fetch(instance.optionsUrl!, { method: instance.optionsUrlMethod });
      const json = await res.json();
      if (!json || json.code) throw new Error("没有数据");
      instance.reqOptions = json;
    } catch (error) {
      console.log(error);
      instance.reqOptions = [];
    }
  },
};
