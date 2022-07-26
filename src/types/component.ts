import type { IBaseNode } from "~/lowform-meta/type";

// 组件的map类型
export type IComponentMap = Record<string, IBaseNode>;

// icon前后图标
export const enum EIconPreSuf {
  PrefixIcon = "prefixIcon",
  SuffixIcon = "suffixIcon",
}
