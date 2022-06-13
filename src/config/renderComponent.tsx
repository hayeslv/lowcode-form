import { ElInput, ElInputNumber } from "element-plus";
import type { ElementComponent } from "./component";
import { useForm } from "./component";

const { getForm } = useForm();
const form = getForm();

export const renderComponentMap = {
  input: (component: ElementComponent) => <ElInput v-model={form[component.__vModel__]} placeholder={component.placeholder} />,
  textarea: (component: ElementComponent) => <ElInput v-model={form[component.__vModel__]} placeholder={component.placeholder} type="textarea" {...{ rows: 2 }} />,
  number: (component: ElementComponent) => <ElInputNumber v-model={form[component.__vModel__]} placeholder={component.placeholder} />,
};
