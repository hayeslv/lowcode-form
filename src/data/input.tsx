import { Search } from "@element-plus/icons-vue";
import { ElInput } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 1,
  group: EComponentType.FORM,
  key: "input",
  label: "输入框",
  placeholder: "请输入",
  maxlength: null,
  clearable: true,
  prefixIcon: Search,
  render: (node: FormNode) => {
    const instance = node.instance;
    return <ElInput
      placeholder={instance.placeholder ?? data.placeholder}
      clearable={instance.clearable}
      v-model={instance.defaultValue}
      {...{
        maxlength: parseInt(instance.maxlength?.toString() as string) || null,
      }}
      prefixIcon={node.instance.prefixIcon}
    />;
  },
};

export default data;
