import { ElOption, ElSelect } from "element-plus";
import type { FormSelectNode } from "~/lowform-meta/instance/Node";
import type { ISelectPlatformNode } from "~/lowform-meta/type";
import { EOptionsDataType, EComponentType } from "~/lowform-meta/type";

const data: ISelectPlatformNode = {
  show: true,
  group: EComponentType.SELECT,
  key: "select",
  label: "下拉选择",
  placeholder: "请选择",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormSelectNode) => {
    const instance = node.instance;
    const placeholder = instance.placeholder ?? data.placeholder;
    let options = instance.options ?? data.options ?? [];
    if (instance.optionsDataType === EOptionsDataType.DYNAMIC) {
      options = instance.reqOptions || [];
    }
    const optionsRender = () => options.map(v => (
      <ElOption label={v.label} value={v.value}></ElOption>
    ));
    return <ElSelect
      style="width: 100%"
      placeholder={placeholder}
      v-model={instance.defaultValue}
    >
      {optionsRender()}
    </ElSelect>;
  },
};

export default data;
