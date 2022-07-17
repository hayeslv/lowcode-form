import { useFormConfig } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { EOptionsDataType } from "~/lowform-meta/type";

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
    const instance = node.instance;
    const { vModel, placeholder } = attrBuilder(node);
    const optionStr = (node.instance.options || [])
      .map(v => `<ElOption label="${v.label}" value="${v.value}" />`)
      .join("\n");

    const dynamicRender = `{ formOptions.${instance.model}Options.map((v: Record<string, number | string>) => <ElOption label={v.label} value={v.value} />) }`;
    return `<ElSelect ${vModel} ${placeholder} style="width: 100%;">
      ${instance.optionsDataType === EOptionsDataType.DYNAMIC ? dynamicRender : optionStr}
    </ElSelect>`;
  },
  radio: (node: FormNode) => {
    const instance = node.instance;
    const { vModel } = attrBuilder(node);
    const optionStr = (node.instance.options || [])
      .map(v => `<ElRadio label="${v.value}">${v.label}</ElRadio>`)
      .join("\n");

    const dynamicRender = `{ formOptions.${instance.model}Options.map((v: Record<string, number | string>) => <ElRadio label={v.value}>{v.label}</ElRadio>) }`;
    return `<ElRadioGroup ${vModel}>
      ${instance.optionsDataType === EOptionsDataType.DYNAMIC ? dynamicRender : optionStr}
    </ElRadioGroup>`;
  },
  checkbox: (node: FormNode) => {
    const { vModel } = attrBuilder(node);
    const optionStr = (node.instance.options || [])
      .map(v => `<ElCheckbox label="${v.value}">${v.label}</ElCheckbox>`)
      .join("\n");
    return `<ElCheckboxGroup ${vModel}>
      ${optionStr}
    </ElCheckboxGroup>`;
  },
};
