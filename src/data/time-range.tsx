import { ElTimePicker } from "element-plus";
import type { FormTimeNode } from "~/lowform-meta/instance/Node";
import type { ITimePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: ITimePlatformNode = {
  show: true,
  order: 6,
  group: EComponentType.SELECT,
  key: "time-range",
  label: "时间范围",
  format: "HH:mm:ss",
  valueFormat: "HH:mm:ss",
  defaultValue: [],
  clearable: true,
  render: (node: FormTimeNode) => {
    const instance = node.instance;

    return <ElTimePicker
      v-model={instance.defaultValue}
      isRange={true}
      format={instance.format}
      valueFormat={instance.valueFormat}
      rangeSeparator="至"
      startPlaceholder="开始时间"
      endPlaceholder="结束时间"
      clearable={instance.clearable}
    />;
  },
};

export default data;
