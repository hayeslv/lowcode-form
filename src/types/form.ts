import type { FormConfigType } from "~/hooks";
import type { FormNode, FormSelectNode } from "~/lowform-meta/instance/Node";
import type { GenerateCodeType, TopOperateType } from ".";

/** Form总类型，包含组件列表 */
export type FormConfigTotalType = FormConfigType & { fileds: (FormNode | FormSelectNode)[] };

// 下载vue文件弹窗的Form类型
export interface DialogFormType {
  //* 操作类型 */
  operateType: TopOperateType;
  //* 文件名 */
  fileName: string;
  //* 生成代码类型：page或dialog */
  type: GenerateCodeType;
}
