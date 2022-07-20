import { ElTimePicker } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { ISelectPlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: ISelectPlatformNode = {
  show: true,
  group: EComponentType.SELECT,
  key: "time",
  label: "时间选择",
  placeholder: "请选择",
  render: (node: FormNode) => {
    const instance = node.instance;
    const placeholder = instance.placeholder ?? data.placeholder;

    return <ElTimePicker placeholder={placeholder} v-model={instance.defaultValue} />;
  },
};

export default data;
