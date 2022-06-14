import { ElInput, ElInputNumber } from "element-plus";
import type { ElementComponent } from "./component";
import { useForm } from "./component";

const { getForm } = useForm();
const form = getForm();

const onDefaultValueInput = (value, component) => {
  component.__config__.defaultValue = value;
  form[component.__vModel__] = value;
};

export const renderComponentMap = {
//   input: (component: ElementComponent) =>
//     <ElInput v-model={form[component.__vModel__]} placeholder={component.placeholder} />,
  input: (component: ElementComponent) =>
    <ElInput modelValue={form[component.__vModel__]}
      onInput={(value) => onDefaultValueInput(value, component)}
      placeholder={component.placeholder} />,
  textarea: (component: ElementComponent) =>
    <ElInput v-model={form[component.__vModel__]}
      placeholder={component.placeholder}
      type="textarea" {...{ rows: 2 }}
    />,
  number: (component: ElementComponent) =>
    <ElInputNumber v-model={form[component.__vModel__]}
      placeholder={component.placeholder}
    />,
};
