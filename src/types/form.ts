import type { ElementComponent } from "~/config";
import type { FormConfigType } from "~/utils";

/** Form总类型，包含组件列表 */
export type FormConfigTotalType = FormConfigType & { fileds: ElementComponent[] };

// 下载vue文件弹窗的Form类型
export interface DialogFormType {
  fileName: string;
  type: string;
}
