import { ElInput, ElInputNumber } from "element-plus";
import type { ElementComponent } from "./component";
import { useForm } from "./component";

const { getForm } = useForm();
const form = getForm();

export const renderComponentMap = {
  input: (component: ElementComponent) => <ElInput v-model={form[component.__vModel__]} placeholder="请输入单行文本" />,
  textarea: (component: ElementComponent) => <ElInput v-model={form[component.__vModel__]} placeholder="请输入多行文本" type="textarea" {...{ rows: 2 }} />,
  number: (component: ElementComponent) => <ElInputNumber v-model={form[component.__vModel__]} placeholder="计数器" />,
};
