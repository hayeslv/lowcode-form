import { ElCheckbox, ElCheckboxGroup } from "element-plus";
import type { FormSelectNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EOptionsDataType, EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 2,
  group: EComponentType.SELECT,
  key: "checkbox",
  label: "多选框",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormSelectNode) => {
    const instance = node.instance;
    let options = instance.options ?? data.options ?? [];
    // 初始化defaultValue
    !node.instance.defaultValue && (node.instance.defaultValue = []);
    if (instance.optionsDataType === EOptionsDataType.DYNAMIC) {
      options = instance.reqOptions || [];
    }

    const optionsRender = () => options.map(v => (
      <ElCheckbox label={v.value}>{v.label}</ElCheckbox>
    ));

    return <ElCheckboxGroup style="width: 100%;" v-model={node.instance.defaultValue}>
      {optionsRender()}
    </ElCheckboxGroup>;
  },
};

export default data;
