import { ElSwitch } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  group: EComponentType.SELECT,
  key: "switch",
  label: "开关",
  defaultValue: "false",
  render: (node: FormNode) => {
    const instance = node.instance;
    return <ElSwitch v-model={instance.defaultValue} />;
  },
};

export default data;
