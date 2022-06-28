import { ElInput, ElInputNumber } from "element-plus";
import { useDrawingList, useForm } from "~/hooks";
import { createComponentsConfig } from "~/utils";
import type { ElementComponent } from "./component";

const { drawingList } = useDrawingList();
const { getForm } = useForm();
const form = getForm();

// 更新默认值
export const onDefaultValueInput = (value, component: ElementComponent) => {
  const vModel = component.__vModel__;
  // 从drawingList中找到绑定值是vModel的对象，将其默认值更新
  drawingList.value.forEach(v => {
    if (v.__vModel__ === vModel) {
      v.__config__.defaultValue = value;
    }
  });
  // 更新form的值
  form[component.__vModel__] = value;
};

export const renderComponentMap = {
  input: (component: ElementComponent) =>
    <ElInput modelValue={form[component.__vModel__]}
      onInput={(value) => onDefaultValueInput(value, component)}
      placeholder={component.placeholder} />,
  textarea: (component: ElementComponent) =>
    <ElInput modelValue={form[component.__vModel__]}
      onInput={(value) => onDefaultValueInput(value, component)}
      placeholder={component.placeholder}
      type="textarea" {...{ rows: 2 }}
    />,
  number: (component: ElementComponent) =>
    <ElInputNumber modelValue={parseInt(form[component.__vModel__])}
      onInput={(value) => onDefaultValueInput(value, component)}
      placeholder={component.placeholder}
    />,
  password: (component: ElementComponent) =>
    <ElInput modelValue={form[component.__vModel__]}
      onInput={(value) => onDefaultValueInput(value, component)}
      placeholder={component.placeholder}
      type="password"
      show-password />,
};

// 注册的方式提供组件
export const ComponentsConfig = createComponentsConfig();

ComponentsConfig.registry("input", {
  label: "输入框",
  model: {
    default: "",
  },
  preview: () => <ElInput />,
  render: ({ model, custom }) => (
    <ElInput
      {...custom}
      {...model.default}
    />
  ),
});
