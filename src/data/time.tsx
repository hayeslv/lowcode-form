import { ElTimePicker } from "element-plus";
import type { FormTimeNode } from "~/lowform-meta/instance/Node";
import type { ITimePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: ITimePlatformNode = {
  show: true,
  order: 5,
  group: EComponentType.SELECT,
  key: "time",
  label: "时间选择",
  placeholder: "请选择",
  format: "HH:mm:ss",
  valueFormat: "HH:mm:ss",
  defaultValue: "",
  clearable: true,
  render: (node: FormTimeNode) => {
    const instance = node.instance;
    const placeholder = instance.placeholder ?? data.placeholder;

    return <ElTimePicker
      style="width: 100%;"
      placeholder={placeholder}
      v-model={instance.defaultValue}
      format={instance.format}
      valueFormat={instance.valueFormat}
      // clearable={instance.clearable}
    />;
  },
};

export default data;
