import { ElButton } from "element-plus";
import type { IBasePlatformNode } from "~/lowform-meta/type";
import { EComponentType } from "~/lowform-meta/type";

const data: IBasePlatformNode = {
  show: false,
  group: EComponentType.BASIC,
  key: "button",
  label: "按钮",
  render: () => <ElButton>{data.label}</ElButton>,
};

export default data;
