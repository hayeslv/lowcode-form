import { ElInput } from "element-plus";
import type { IBaseNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBaseNode & { show: boolean } = {
  show: true,
  group: EComponentType.FORM,
  key: "input",
  label: "输入框",
  placeholder: "请输入",
  render: () => <ElInput placeholder={data.placeholder} />,
};

export default data;
