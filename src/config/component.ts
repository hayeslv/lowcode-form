
interface componentTypeItem {
  key: string;
  title: string;
  list: Component[];
}

interface Component {
  key: string;
  title: string;
  icon: string;
}

// 输入型组件
export const inputComponents: Component[] = [
  {
    key: "input",
    title: "输入框",
    icon: "input",
  },
  {
    key: "textarea",
    title: "多行输入框",
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
