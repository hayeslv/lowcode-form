// 组件类型
export const enum EComponentType {
  BASIC = "basic",          // 基础组件
  FORM = "form",            // form表单组件
  LAYOUT = "layout",        // 布局组件
}
// 组件类型对应中文名
export enum EComponentTypeName {
  "basic" = "基础组件",
  "form" = "表单组件",
  "layout" = "布局组件",
}

export interface IOptionType {
  label: string;
  value: string | number;
}

// 项目、页面、组件
// export interface BasicData {
//   id?: number;    // 唯一值（实例化后得到）

// }

// 节点（组件）数据
export interface IBaseNode {
  group: EComponentType;   // 组件分组
  key: string;            // 组件key，例如：text、input、button等
  label: string;          // 中文释义
  placeholder?: string;   // 默认用“请输入”
  defaultValue?: string;  // 默认值
  labelWidth?: number;    // 标签宽度
  options?: IOptionType[];
  render: (...args: any[]) => JSX.Element;       // 渲染函数
}

// form表单组件
export interface IFormNodeInstance extends IBaseNode {
  id: number;             // 唯一值（实例化后得到）
  model: string;          // 绑定字段：可能没有，也可能有多个（如日期区间）
}

// 平台层面组件
export interface IBasePlatformNode extends IBaseNode {
  show: boolean;
}
