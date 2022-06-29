
import { useForm, useGlobalId } from "~/hooks";
import type { IComponent } from "~/types";

interface componentTypeItem {
  key: string;
  title: string;
  list: MenuComponent[];
}

// 左侧未实例化的组件
export interface MenuComponent {
  tag: string;
  label: string;
  type: string;
  typeName: string;
  layout: "colFormItem" | "rowFormItem";
  placeholder?: string;
  icon?: string;
  isMenuComponent?: boolean; // 是否是菜单组件
  // render: (...args) => JSX.Element;
}

// 中间的组件（实例化后）
export interface ElementComponent extends MenuComponent {
  id: number;
  transiting: boolean;      // 是否正在过渡（改变位置）
  __vModel__: string;
  children: ElementComponent[]; // 这个是容器组件需要用到的； // TODO 待优化：区分容器组件和普通组件的类型
  __config__: {
    span: number;
    labelWidth?: number;
    defaultValue?: any;
  };
}

// 布局型组件（实例化后）
export interface LayoutComponent extends MenuComponent {
  id: number;
  transiting: boolean;      // 是否正在过渡（改变位置）
  __config__: {
    span: number;
  };
}

// 输入型组件
export const inputComponents: MenuComponent[] = [
  {
    tag: "el-input",
    type: "input",
    typeName: "单行输入框",
    placeholder: "请输入单行文本",
    label: "单行输入框",
    icon: "input",
    layout: "colFormItem",
  },
  {
    tag: "el-input",
    type: "textarea",
    typeName: "多行输入框",
    placeholder: "请输入多行文本",
    label: "多行输入框",
    icon: "textarea",
    layout: "colFormItem",
  },
  {
    tag: "el-input",
    type: "password",
    typeName: "密码",
    placeholder: "请输入密码",
    label: "密码",
    icon: "password",
    layout: "colFormItem",
  },
  {
    tag: "el-input-number",
    type: "number",
    typeName: "计数器",
    placeholder: "计数器",
    label: "计数器",
    icon: "number",
    layout: "colFormItem",
  },
];

// 布局型组件
export const layoutComponents: MenuComponent[] = [
  // TODO 待优化：类型、名称过于冗余
  {
    tag: "el-col",
    type: "layout",
    typeName: "容器",
    label: "容器",
    icon: "row",
    layout: "rowFormItem",
  },
];

// 组件类型列表
export const componentTypeList: componentTypeItem[] = [
  {
    key: "input",
    title: "输入型组件",
    list: inputComponents,
  },
  {
    key: "select",
    title: "选择型组件",
    list: [],
  },
  {
    key: "layout",
    title: "布局型组件",
    list: layoutComponents,
  },
];

// 左侧菜单组件实例化
export const menuComponentInstance = (() => {
  return (element: IComponent): IComponent => {
    // 已经实例化过了（有id）
    if (element.id) return element;
    const { getGlobalId } = useGlobalId();
    const { setFormValue } = useForm();
    const id = getGlobalId(); // 组件id
    const key = `field${id}`; // 组件绑定的key
    setFormValue(key);

    return {
      ...element,
      id: id,
      __vModel__: key,
    };
  };
})();
