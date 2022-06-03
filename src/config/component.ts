
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
}

// 中间的组件
export interface ElementComponent extends MenuComponent {
  id: number;
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
  },
  {
    key: "textarea",
    label: "多行输入框",
    icon: "textarea",
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
    list: [],
  },
];
