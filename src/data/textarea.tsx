import { ElInput } from "element-plus";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: true,
  group: EComponentType.FORM,
  key: "textarea",
  label: "多行输入框",
  placeholder: "请输入",
  render: () => <ElInput type="textarea" placeholder={data.placeholder} />,
};

export default data;
