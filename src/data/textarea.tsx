import { ElInput } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 2,
  group: EComponentType.FORM,
  key: "textarea",
  label: "多行输入框",
  placeholder: "请输入",
  render: (node: FormNode) => (
    <ElInput
      type="textarea"
      placeholder={node.instance.placeholder ?? data.placeholder}
      v-model={node.instance.defaultValue}
    />
  ),
};

export default data;
