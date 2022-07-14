import { useFormConfig } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { getFormConfig } = useFormConfig();

const attrBuilder = (node: FormNode) => {
  const formConfig = getFormConfig();
  return {
    vModel: `v-model={${formConfig.formModel}.${node.instance.model}}`,
    placeholder: node.instance.placeholder ? `placeholder="${node.instance.placeholder}"` : "",
  };
};

export const tagMap = {
  input: (node: FormNode) => {
    const { vModel, placeholder } = attrBuilder(node);
    return `<ElInput ${vModel} ${placeholder} />`;
  },
  textarea: (node: FormNode) => {
    const { vModel, placeholder } = attrBuilder(node);
    return `<ElInput type="textarea" ${vModel} ${placeholder} />`;
  },
  select: (node: FormNode) => {
    const { vModel, placeholder } = attrBuilder(node);
    const optionStr = (node.instance.options || [])
      .map(v => `<ElOption label="${v.label}" value="${v.value}" />`)
      .join("\n");
    return `<ElSelect ${vModel} ${placeholder} style="width: 100%;">
      ${optionStr}
    </ElSelect>`;
  },
  radio: (node: FormNode) => {
    const { vModel } = attrBuilder(node);
    const optionStr = (node.instance.options || [])
      .map(v => `<ElRadio label="${v.value}">${v.label}</ElRadio>`)
      .join("\n");
    return `<ElRadioGroup ${vModel}>
      ${optionStr}
    </ElRadioGroup>`;
  },
};
