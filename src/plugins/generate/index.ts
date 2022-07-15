import { useFormConfig, useNodeList } from "~/hooks";
import { ElNotification } from "element-plus";
import type { DialogFormType, FormConfigTotalType } from "~/types";
import { TopOperateType } from "~/types";
import { copyText } from "~/utils";
import { cloneDeep } from "lodash";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { GenerateCode } from "./GenerateCode";

/**
 * 集合表单数据
 */
const assembleFormData = (): FormConfigTotalType => {
  const { getNodeList } = useNodeList();
  const { getFormConfig } = useFormConfig();

  return {
    fileds: cloneDeep(getNodeList()) as FormNode[],
    ...getFormConfig(),
  };
};

const generateCode = (data: DialogFormType): string => {
  const formData = assembleFormData();

  const generateCode = new GenerateCode(formData, data.type);

  return generateCode.code;
};

export const generateMethods = {
  [TopOperateType.Copy](data: DialogFormType) {
    // 生成代码字符串
    const codeStr = generateCode(data);
    copyText(codeStr).then(() => {
      ElNotification({
        title: "成功",
        message: "代码已复制到剪切板，可粘贴。",
        type: "success",
      });
    });
  },
};
