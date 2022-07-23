import type { DatePickType, FormItemRule } from "element-plus";

// 组件类型
export const enum EComponentType {
  BASIC = "basic",          // 基础组件
  FORM = "form",            // form表单组件
  SELECT = "select",        // 选择型组件
  LAYOUT = "layout",        // 布局组件
}
// 组件类型对应中文名
export enum EComponentTypeName {
  "basic" = "基础组件",
  "form" = "表单组件",
  "select" = "选择组件",
  "layout" = "布局组件",
}

export interface IOptionType {
  label: string;
  value: string | number;
}

// options数据类型
export const enum EOptionsDataType {
  DYNAMIC = "dynamic",  // 动态
  STATIC = "static",    // 静态
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
  defaultValue?: number | string | string[] | boolean;  // 默认值
  labelWidth?: number;    // 标签宽度
  column?: number;        // 列数
  maxlength?: number | null;     // 最大输入数量
  clearable?: boolean;    // 能否清空
  options?: IOptionType[];
  optionsDataType?: EOptionsDataType;
  optionsUrl?: string;    // 获取options的接口地址
  optionsUrlMethod?: string;
  render: (...args: any[]) => JSX.Element;       // 渲染函数
}

// 选择组件
export interface ISelectNode extends IBaseNode {
  reqDataPosition?: string;
  reqLabelName?: string;
  reqValueName?: string | number;
  reqOptions?: IOptionType[];
}

// 时间组件
export interface ITimeNode extends IBaseNode {
  format: string;
  valueFormat: string;
  dateType?: DatePickType;
}

interface instanceType {
  id: number;         // 唯一值（实例化后得到）
  model: string;      // 绑定字段：可能没有，也可能有多个（如日期区间）
  required: boolean;  // 是否必填
  regList: FormItemRule[];
}
interface plantformType {
  show: boolean;    // 是否显示
  order?: number;   // 排序
}

// form表单组件
export interface IFormNodeInstance extends IBaseNode, instanceType {}
// 选择类
export interface IFormSelectNodeInstance extends ISelectNode, instanceType {}
// 时间类
export interface IFormTimeNodeInstance extends ITimeNode, instanceType {}

// 平台层面组件（基础）
export interface IBasePlatformNode extends IBaseNode, plantformType {}
// 平台层面组件（选择）
export interface ISelectPlatformNode extends ISelectNode, plantformType {}
// 平台层面组件（时间）
export interface ITimePlatformNode extends ITimeNode, plantformType {}
