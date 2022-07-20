import { ElDatePicker } from "element-plus";
import type { FormTimeNode } from "~/lowform-meta/instance/Node";
import type { ITimePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: ITimePlatformNode = {
  show: true,
  order: 7,
  group: EComponentType.SELECT,
  key: "date",
  label: "日期选择",
  placeholder: "请选择",
  format: "YYYY-MM-DD",
  valueFormat: "YYYY-MM-DD",
  dateType: "date",
  render: (node: FormTimeNode) => {
    const instance = node.instance;
    const placeholder = instance.placeholder ?? data.placeholder;

    return <ElDatePicker
      style="width: 100%;"
      placeholder={placeholder}
      v-model={instance.defaultValue}
      format={instance.format}
      valueFormat={instance.valueFormat}
      type={instance.dateType}
    />;
  },
};

export default data;
