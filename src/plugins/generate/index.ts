import { cloneDeep } from "lodash";
import { useDrawingList } from "~/hooks";
import type { FormConfigTotalType } from "~/types";
import { useFormConfig } from "~/utils";

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
  console.log(formData);
};

export const generateMethods = {
  download() {
    // 生成代码字符串
    const codeStr = generateCode();
  },
};

export * from "./html";
