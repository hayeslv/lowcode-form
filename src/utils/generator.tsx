import { ElFormItem } from "element-plus";

export function wrapFormItem(code: JSX.Element, params?: Record<string, any>) {
  return <ElFormItem {...params}>{code}</ElFormItem>;
}
