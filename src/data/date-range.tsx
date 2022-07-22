import { ElDatePicker } from "element-plus";
import type { FormTimeNode } from "~/lowform-meta/instance/Node";
import type { ITimePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: ITimePlatformNode = {
  show: true,
  order: 8,
  group: EComponentType.SELECT,
  key: "date-range",
  label: "日期范围",
  defaultValue: [],
  format: "YYYY-MM-DD",
  valueFormat: "YYYY-MM-DD",
  dateType: "daterange",
  clearable: true,
  render: (node: FormTimeNode) => {
    const instance = node.instance;

    return <ElDatePicker
      startPlaceholder="开始日期"
      endPlaceholder="结束日期"
      rangeSeparator="至"
      v-model={instance.defaultValue}
      format={instance.format}
      valueFormat={instance.valueFormat}
      type={instance.dateType}
      clearable={instance.clearable}
    />;
  },
};

export default data;
