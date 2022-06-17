import { cloneDeep } from "lodash";
import { useDrawingList } from "~/hooks";
import type { DialogFormType, FormConfigTotalType } from "~/types";
import { useFormConfig } from "~/utils";
import { makeUpHtml, vueTemplate } from "./html";
import { saveAs } from "file-saver";
import { makeUpJs } from "./js";

/**
 * 集合表单数据
 */
const assembleFormData = (): FormConfigTotalType => {
  const { drawingList } = useDrawingList();
  const { getFormConfig } = useFormConfig();

  return {
    fileds: cloneDeep(drawingList.value),
    ...getFormConfig(),
  };
};

// 生成代码
const generateCode = () => {
  const formData =  assembleFormData();

  const html = vueTemplate(makeUpHtml(formData));
  const script = makeUpJs(formData);
  console.log(script);
  // const css =  // 处理css--暂时没有
  return html;
};

export const generateMethods = {
  download(data: DialogFormType) {
    // 生成代码字符串
    const codeStr = generateCode();
    const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
    saveAs(blob, data.fileName);
  },
};

export * from "./html";
