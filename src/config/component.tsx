import { reactive } from "vue";
import { useGlobalId } from "~/hooks";

interface componentTypeItem {
  key: string;
  title: string;
  list: MenuComponent[];
}

// 左侧未实例化的组件
export interface MenuComponent {
  label: string;
  type: string;
  typeName: string;
  placeholder: string;
  icon?: string;
  isMenuComponent?: boolean; // 是否是菜单组件
  // render: () => JSX.Element;
}

// 中间的组件（实例化后）
export interface ElementComponent extends MenuComponent {
  id: number;
  layout: string;
  transiting: boolean;      // 是否正在过渡（改变位置）
  __vModel__: string;
  __config__: {
    span: number;
    labelWidth?: number;
    defaultValue?: any;
  };
}

// 输入型组件
export const inputComponents: MenuComponent[] = [
  {
    type: "input",
    typeName: "单行输入框",
    placeholder: "请输入单行文本",
    label: "单行输入框",
    icon: "input",
  },
  {
    type: "textarea",
    typeName: "多行输入框",
    placeholder: "请输入多行文本",
    label: "多行输入框",
    icon: "textarea",
  },
  {
    type: "number",
    typeName: "计数器",
    placeholder: "计数器",
    label: "计数器",
    icon: "number",
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

// 左侧菜单组件实例化
export const menuComponentInstance = (() => {
  return (element: MenuComponent): ElementComponent => {
    const { getGlobalId } = useGlobalId();
    const { setFormValue } = useForm();
    const id = getGlobalId(); // 组件id
    const key = `field${id}`; // 组件绑定的key
    setFormValue(key);

    return {
      ...element,
      id: id,
      layout: "colFormItem", // 默认先用列排列
      isMenuComponent: true,
      transiting: false,
      __vModel__: key,
      __config__: {
        span: 24,
      },
    };
  };
})();

// 使用form表单
export const useForm = (() => {
  const form = reactive({});
  return () => {
    const getForm = () => {
      return form;
    };
    const setFormValue = (key: string, value?: any) => {
      form[key] = value;
    };

    return { getForm, setFormValue };
  };
})();
