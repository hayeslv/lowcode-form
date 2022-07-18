import { ElInputNumber } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 3,
  group: EComponentType.FORM,
  key: "number",
  label: "计数器",
  placeholder: "",
  render: (node: FormNode) => (
    <ElInputNumber
      placeholder={node.instance.placeholder ?? data.placeholder}
      modelValue={Number(node.instance.defaultValue)}
      {...{
        "onUpdate:modelValue": value => (node.instance.defaultValue = value?.toString()),
      }}
    />
  ),
};

export default data;
