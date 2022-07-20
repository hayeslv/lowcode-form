import { ElRadio, ElRadioGroup } from "element-plus";
import type { FormSelectNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EOptionsDataType, EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 5,
  group: EComponentType.SELECT,
  key: "radio",
  label: "单选框",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormSelectNode) => {
    const instance = node.instance;
    let options = instance.options ?? data.options ?? [];
    if (instance.optionsDataType === EOptionsDataType.DYNAMIC) {
      options = instance.reqOptions || [];
    }

    const optionsRender = () => options.map(v => (
      <ElRadio label={v.value}>{v.label}</ElRadio>
    ));

    return <ElRadioGroup style="width: 100%;" v-model={instance.defaultValue}>
      {optionsRender()}
    </ElRadioGroup>;
  },
};

export default data;
