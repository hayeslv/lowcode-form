import { ElInput } from "element-plus";

interface componentTypeItem {
  key: string;
  title: string;
  list: MenuComponent[];
}

// 左侧未实例化的组件
export interface MenuComponent {
  key: string;
  label: string;
  icon?: string;
  isMenuComponent?: boolean; // 是否是菜单组件
  render: (data?: {
    props?: any;
  }) => JSX.Element;
}

// 中间的组件（实例化后）
export interface ElementComponent extends MenuComponent {
  id: number;
  layout: string;
  __config__: {
    span: number;
    labelWidth?: number;
  };
}

// 表单属性
export const formConfig = {
  gutter: 15,
  labelPosition: "right",
  disabled: false,
  labelWidth: 100,
};

// 输入型组件
export const inputComponents: MenuComponent[] = [
  {
    key: "input",
    label: "输入框",
    icon: "input",
    render: () => <ElInput />,
  },
  // {
  //   key: "textarea",
  //   label: "多行输入框",
  //   icon: "textarea",
  // },
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
    list: [],
  },
];

// 左侧菜单组件实例化
export const menuComponentInstance = (element: MenuComponent): ElementComponent => {
  return {
    id: Math.floor(Math.random() * 9999999),
    layout: "colFormItem", // 默认先用列排列
    isMenuComponent: true,
    __config__: {
      span: 24,
    },
    ...element,
  };
};
