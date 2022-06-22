import { cloneDeep } from "lodash";
import { GlobelItem, useDrawingList, useGlobalObject } from "~/hooks";
import type { DialogFormType, FormConfigTotalType } from "~/types";
import { useFormConfig } from "~/utils";
import { makeUpHtml, vueCssStyle, vueScript, vueTemplate } from "./html";
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
const generateCode = (data: DialogFormType) => {
  const { getGlobalItem } = useGlobalObject();
  const formData =  assembleFormData();

  const html = vueTemplate(makeUpHtml(formData, data.type));
  const script = vueScript(makeUpJs(formData));
  const css =  vueCssStyle();
  return getGlobalItem(GlobelItem.beautifier)
    .html(html + "\n\n" + script + "\n\n" + css, {
      end_with_newline: true,
      indent_size: 2,
    });
};

export const generateMethods = {
  download(data: DialogFormType) {
    // 生成代码字符串
    const codeStr = generateCode(data);
    const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
    saveAs(blob, data.fileName);
  },
};

export * from "./html";
