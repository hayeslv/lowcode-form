import { ElInput, ElInputNumber } from "element-plus";
import { useDrawingList, useForm } from "~/hooks";
import type { IComponent, IComponentType } from "~/types";
import { ComponentType } from "~/types";
import { createComponentsConfig } from "~/utils";

const { drawingList } = useDrawingList();
const { getForm } = useForm();
const form = getForm();

// 更新默认值
export const onDefaultValueInput = (value, component: IComponent) => {
  const vModel = component.__vModel__;
  // 从drawingList中找到绑定值是vModel的对象，将其默认值更新
  drawingList.value.forEach(v => {
    if (v.__vModel__ === vModel) {
      v.__config__.defaultValue = value;
    }
  });
  // 更新form的值
  form[component.__vModel__!] = value;
};

// 组件类型
export const ComponentTypes: IComponentType[] = [
  { key: ComponentType.INPUT, value: "输入型组件" },
  { key: ComponentType.SELECT, value: "选择型组件" },
  { key: ComponentType.LAYOUT, value: "布局型组件" },
];
// 注册的方式提供组件
export const ComponentsConfig = createComponentsConfig();

//* 文本输入框 */
ComponentsConfig.registry("input", {
  label: "单行输入框",
  type: ComponentType.INPUT,
  model: {
    default: "",
  },
  icon: "input",
  placeholder: "请输入文本内容",
  transiting: false,
  isMenuComponent: false,
  layout: "colFormItem",
  __config__: {
    span: 24,
    defaultValue: "",
  },
  children: [],
}, ({ model, custom, component }) => (
  <ElInput
    // modelValue={form[component.__vModel__]}
    // onInput={(value) => onDefaultValueInput(value, component)}
    placeholder={component.placeholder}
    {...custom}
    {...model.default}
  />
));
//* 多行文本输入框 */
ComponentsConfig.registry("textarea", {
  label: "多行输入框",
  type: ComponentType.INPUT,
  model: {
    default: "",
  },
  icon: "textarea",
  placeholder: "请输入多行文本内容",
  transiting: false,
  isMenuComponent: false,
  layout: "colFormItem",
  __config__: {
    span: 24,
    defaultValue: "",
  },
  children: [],
}, ({ model, custom, component }) => (
  <ElInput
    type="textarea"
    placeholder={component.placeholder}
    {...{ rows: 2 }}
    {...custom}
    {...model.default}
  />
));
//* 计数器 */
ComponentsConfig.registry("number", {
  label: "计数器",
  type: ComponentType.INPUT,
  model: {
    default: "",
  },
  icon: "number",
  placeholder: "计数器",
  transiting: false,
  isMenuComponent: false,
  layout: "colFormItem",
  __config__: {
    span: 24,
    defaultValue: 0,
  },
  children: [],
}, ({ model, custom, component }) => (
  <ElInputNumber
    placeholder={component.placeholder}
    {...custom}
    {...model.default}
  />
));
//* 密码框 */
ComponentsConfig.registry("password", {
  label: "密码框",
  type: ComponentType.INPUT,
  model: {
    default: "",
  },
  icon: "password",
  placeholder: "请输入密码",
  transiting: false,
  isMenuComponent: false,
  layout: "colFormItem",
  __config__: {
    span: 24,
    defaultValue: "",
  },
  children: [],
}, ({ model, custom, component }) => (
  <ElInput
    placeholder={component.placeholder}
    type="password"
    show-password
    {...custom}
    {...model.default}
  />
));

/* ---------------------------------------- 布局型组件 ---------------------------------------- */
//* 容器 */
ComponentsConfig.registry("container", {
  label: "容器",
  type: ComponentType.LAYOUT,
  icon: "row",
  transiting: false,
  isMenuComponent: false,
  layout: "rowFormItem",
  __config__: {
    span: 24,
  },
  children: [],
});
