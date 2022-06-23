import { cloneDeep } from "lodash";
import { GlobelItem, useDrawingList, useGlobalObject } from "~/hooks";
import type { DialogFormType, FormConfigTotalType } from "~/types";
import { useFormConfig } from "~/utils";
import { saveAs } from "file-saver";
import { GenerateCode } from "./GenerateCode";

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
  const formData = assembleFormData();

  const generateCode = new GenerateCode(formData, data.type);
  const code = generateCode
    .makeUpHtml()
    .buildSetup()
    .defineComponentWrap()
    .buildScriptImport()
    .code;

  return getGlobalItem(GlobelItem.beautifier)
    .html(code, {
      end_with_newline: true, // 最后一行是否需要空行
      indent_size: 2, // 缩进大小
      indent_with_tabs: false, // 使用tab缩进
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
