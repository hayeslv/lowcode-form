import { ElRadio, ElRadioGroup } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 5,
  group: EComponentType.SELECT,
  key: "radio",
  label: "单选框",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormNode) => {
    const options = node.instance.options ?? data.options ?? [];
    return <ElRadioGroup style="width: 100%;" v-model={node.instance.defaultValue}>
      {options.map(v => (
        <ElRadio label={v.value}>{v.label}</ElRadio>
      ))}
    </ElRadioGroup>;
  },
};

export default data;
