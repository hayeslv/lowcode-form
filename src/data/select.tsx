import { ElOption, ElSelect } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  group: EComponentType.FORM,
  key: "select",
  label: "下拉选择",
  placeholder: "请选择",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormNode) => {
    const placeholder = node.instance.placeholder ?? data.placeholder;
    const options = node.instance.options ?? data.options ?? [];
    return <ElSelect
      style="width: 100%"
      placeholder={placeholder}
      v-model={node.instance.defaultValue}
    >
      {options.map(v => (
        <ElOption label={v.label} value={v.value}></ElOption>
      ))}
    </ElSelect>;
  },
};

export default data;
