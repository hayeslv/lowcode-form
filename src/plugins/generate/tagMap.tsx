import { useFormConfig } from "~/hooks";
import type { FormNode, FormTimeNode } from "~/lowform-meta/instance/Node";
import { EOptionsDataType } from "~/lowform-meta/type";

const { getFormConfig } = useFormConfig();

const attrBuilder = (node: FormNode) => {
  const instance = node.instance;
  const formConfig = getFormConfig();

  const paramsList: string[] = [];
  const obj: Record<string, string> = {
    vModel: `v-model={${formConfig.formModel}.${instance.model}}`,
    placeholder: instance.placeholder ? `placeholder="${instance.placeholder}"` : "",
    params: "",
  };
  if (instance.maxlength && !isNaN(parseInt(instance.maxlength.toString()))) {
    paramsList.push(`maxlength: ${parseInt(instance.maxlength.toString())}`);
  }

  if (paramsList.length !== 0) {
    obj.params = `{...{${paramsList.join(",\n")}}}`;
  }

  return obj;
};

const formOptionsMapRender = (node: FormNode, code: string) => {
  return `{ formOptions.${node.instance.model}Options.map((v: Record<string, number | string>) => ${code}) }`;
};

export const tagMap = {
  input: (node: FormNode) => {
    const { vModel, placeholder, params } = attrBuilder(node);
    return `<ElInput ${vModel} ${placeholder} ${params} />`;
  },
  textarea: (node: FormNode) => {
    const { vModel, placeholder } = attrBuilder(node);
    return `<ElInput type="textarea" ${vModel} ${placeholder} />`;
  },
  number: (node: FormNode) => {
    const { vModel } = attrBuilder(node);
    return `<ElInputNumber ${vModel} />`;
  },
  select: (node: FormNode) => {
    const instance = node.instance;
    const { vModel, placeholder } = attrBuilder(node);
    const optionStr = (instance.options || [])
      .map(v => `<ElOption label="${v.label}" value="${v.value}" />`)
      .join("\n");

    const dynamicRender = formOptionsMapRender(node, "<ElOption label={v.label} value={v.value} />");
    return `<ElSelect ${vModel} ${placeholder} style="width: 100%;">
      ${instance.optionsDataType === EOptionsDataType.DYNAMIC ? dynamicRender : optionStr}
    </ElSelect>`;
  },
  radio: (node: FormNode) => {
    const instance = node.instance;
    const { vModel } = attrBuilder(node);
    const optionStr = (instance.options || [])
      .map(v => `<ElRadio label="${v.value}">${v.label}</ElRadio>`)
      .join("\n");

    const dynamicRender = formOptionsMapRender(node, "<ElRadio label={v.value}>{v.label}</ElRadio>");
    return `<ElRadioGroup ${vModel}>
      ${instance.optionsDataType === EOptionsDataType.DYNAMIC ? dynamicRender : optionStr}
    </ElRadioGroup>`;
  },
  checkbox: (node: FormNode) => {
    const instance = node.instance;
    const { vModel } = attrBuilder(node);
    const optionStr = (instance.options || [])
      .map(v => `<ElCheckbox label="${v.value}">${v.label}</ElCheckbox>`)
      .join("\n");
    const dynamicRender = formOptionsMapRender(node, "<ElCheckbox label={v.value}>{v.label}</ElCheckbox>");
    return `<ElCheckboxGroup ${vModel}>
      ${instance.optionsDataType === EOptionsDataType.DYNAMIC ? dynamicRender : optionStr}
    </ElCheckboxGroup>`;
  },
  switch: (node: FormNode) => {
    const { vModel } = attrBuilder(node);
    return `<ElSwitch ${vModel} />`;
  },
  time: (node: FormTimeNode) => {
    const instance = node.instance;
    const { vModel, placeholder } = attrBuilder(node);
    return `<ElTimePicker style="width: 100%;" ${vModel} format="${instance.format}" valueFormat="${instance.valueFormat}" ${placeholder} />`;
  },
  "time-range": (node: FormTimeNode) => {
    const instance = node.instance;
    const { vModel } = attrBuilder(node);
    return `<ElTimePicker ${vModel} isRange={true} format="${instance.format}" valueFormat="${instance.valueFormat}" rangeSeparator="至" startPlaceholder="开始时间" endPlaceholder="结束时间" />`;
  },
  date: (node: FormTimeNode) => {
    const instance = node.instance;
    const { vModel, placeholder } = attrBuilder(node);
    return `<ElDatePicker ${vModel} ${placeholder} type="${instance.dateType}" style="width: 100%;" format="${instance.format}" valueFormat="${instance.valueFormat}" />`;
  },
  "date-range": (node: FormTimeNode) => {
    const instance = node.instance;
    const { vModel } = attrBuilder(node);
    return `<ElDatePicker ${vModel} type="${instance.dateType}" format="${instance.format}" valueFormat="${instance.valueFormat}" startPlaceholder="开始日期" endPlaceholder="结束日期" rangeSeparator="至" />`;
  },
};
