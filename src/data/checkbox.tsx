import { ElCheckbox, ElCheckboxGroup } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 6,
  group: EComponentType.SELECT,
  key: "checkbox",
  label: "多选框",
  options: [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
  ],
  render: (node: FormNode) => {
    const options = node.instance.options ?? data.options ?? [];
    // 初始化defaultValue
    !node.instance.defaultValue && (node.instance.defaultValue = []);
    return <ElCheckboxGroup style="width: 100%;" v-model={node.instance.defaultValue}>
      {options.map(v => (
        <ElCheckbox label={v.value}>{v.label}</ElCheckbox>
      ))}
    </ElCheckboxGroup>;
  },
};

export default data;
