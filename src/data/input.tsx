import { ElInput } from "element-plus";
import { createVNode } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";
import { iconMapList } from "~/utils";

const data: IBasePlatformNode = {
  show: true,
  order: 1,
  group: EComponentType.FORM,
  key: "input",
  label: "输入框",
  placeholder: "请输入",
  maxlength: null,
  clearable: true,
  prefixIcon: null,
  suffixIcon: null,
  render: (node: FormNode) => {
    const instance = node.instance;
    let prefixIcon: any = null;
    let suffixIcon: any = null;
    if (instance.prefixIcon) prefixIcon = iconMapList.find((v: any) => v.name === instance.prefixIcon);
    if (instance.suffixIcon) suffixIcon = iconMapList.find((v: any) => v.name === instance.suffixIcon);
    return <ElInput
      placeholder={instance.placeholder ?? data.placeholder}
      clearable={instance.clearable}
      v-model={instance.defaultValue}
      {...{
        maxlength: parseInt(instance.maxlength?.toString() as string) || null,
      }}
      prefixIcon={prefixIcon ? createVNode(prefixIcon) : undefined}
      suffixIcon={suffixIcon ? createVNode(suffixIcon) : undefined}
    />;
  },
};

export default data;
