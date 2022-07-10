import { ElInput } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  group: EComponentType.FORM,
  key: "input",
  label: "输入框",
  placeholder: "请输入",
  render: (node: FormNode) => (
    <ElInput
      placeholder={node.instance.placeholder ?? data.placeholder}
    />
  ),
};

export default data;
