export const enum ComponentType {
  BASIC = "basic",          // 基础组件
  INPUT = "input",          // 输入型组件
  SELECT = "select",        // 选择型组件
  LAYOUT = "layout",        // 布局型组件
}

export interface IComponentType { // 组件类型
  key: string;      // 组件类型英文
  value: string;    // 组件类型中文
}
// 组件
export interface IComponent {
  id?: number;                    // 实例化后，组件拥有id
  key: string;                    // 组件key，例如：text、input、button等
  type: ComponentType;            // 组件类型
  label: string;                  // 中文释义
  model?: Record<string, string>; // 绑定字段：可能没有，也可能有多个（如日期区间）
  icon: string;
  placeholder?: string;
  transiting: boolean;            // 是否正在进行动画
  children?: IComponent[];         // 子项：目前只有容器中使用 // TODO 容器考虑和该接口分开
  isMenuComponent: boolean;       // 是否是菜单项 // TODO 应该不需要此项，直接使用id来判断是否是菜单项（菜单项没有id）
  __vModel__?: string;            // 绑定值 // TODO 需要修改为“使用model”
  layout: "colFormItem" | "rowFormItem";
  render?: (...args) => JSX.Element;
  __config__: {                   // 配置项
    span: number;                     // 1~24，col宽度
    defaultValue?: string | number;             // 默认值
    labelWidth?: number;              // form-item的label宽度
  };
  __slot__?: {
    options: { label: string; value: string | number }[];
  };
  // render: (data: {                // 渲染函数
  //   model: any;                       // 绑定字段
  //   custom?: Record<string, any>;      // 用户自定义字段
  // }) => JSX.Element;
}
