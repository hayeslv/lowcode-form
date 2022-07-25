import { useFormConfig } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { FormConfigTotalType } from "~/types";
import { GenerateCodeType } from "~/types";
import { tagMap } from "./tagMap";

const { getFormConfig } = useFormConfig();

// 获取全部node节点的code字符串
const getNodesCode = (formData: FormConfigTotalType) => {
  const nodes = formData.fileds; // 当前画布中的元素
  const codeList: string[] = [];
  nodes.forEach(node => {
    let code = tagMap[node.instance.key](node); // 获得组件tag字符串
    code = wrapFormItem(node, code); // 包裹form-item
    codeList.push(code);
  });
  return codeList;
};

// 包裹form-item
const wrapFormItem = (node: FormNode, tagDom: string) => {
  const formConfig = getFormConfig();

  let labelWidth = "";
  if (node.instance.labelWidth) labelWidth = ` label-width="${node.instance.labelWidth}px"`;

  const label = `label="${node.instance.label}"`;
  const prop = `prop="${node.instance.model}"`;

  const className = (formConfig.column === 2) && (node.instance.column === 2) ? "full" : null;
  const classStr = className ? ` class="${className}"` : "";

  return `<ElFormItem${classStr}${labelWidth} ${label} ${prop}>
    ${tagDom}
  </ElFormItem>`;
};

// 包裹form
const wrapForm = (codeStr: string) => {
  const formConfig = getFormConfig();
  const className = formConfig.column === 2 ? "half" : null;
  const classStr = className ? ` class="${className}"` : "";

  return `<ElForm${classStr} ref={${formConfig.formRef}} model={${formConfig.formModel}} rules={${formConfig.formRules}} label-width="${formConfig.labelWidth}px">
  ${codeStr}
</ElForm>`;
};

const wrapDialog = (str: string) => {
  return `<ElDialog 
  modelValue={props.visible} 
  title="Dialog Title"
  v-slots={{ 
    footer:  () => <div class="dialog-footer">
    <ElButton onClick={() => emit("update:visible", false)}>取消</ElButton>
    <ElButton type="primary" onClick={() => emit("update:visible", false)}>确定</ElButton>
  </div>
  }}>
    ${str}
  </ElDialog>`;
};

export const getHtml = (formData: FormConfigTotalType, pageType: GenerateCodeType) => {
  // 获取每个node的html
  const codeList = getNodesCode(formData);
  // 转为字符串
  let codeStr = codeList.join("\n");

  codeStr = wrapForm(codeStr);

  if (pageType === GenerateCodeType.Dialog) {
    codeStr = wrapDialog(codeStr);
  }

  return codeStr;
};
