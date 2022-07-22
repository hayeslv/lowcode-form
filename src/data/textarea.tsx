import { ElInput } from "element-plus";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  order: 2,
  group: EComponentType.FORM,
  key: "textarea",
  label: "多行输入框",
  placeholder: "请输入",
  maxlength: null,
  render: (node: FormNode) => {
    const instance = node.instance;

    return <ElInput
      type="textarea"
      placeholder={instance.placeholder ?? data.placeholder}
      v-model={instance.defaultValue}
      {...{
        maxlength: parseInt(instance.maxlength?.toString() as string) || null,
      }}
    />;
  },
};

export default data;
