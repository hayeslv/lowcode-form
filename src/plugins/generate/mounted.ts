import { EOptionsDataType } from "~/lowform-meta/type";
import type { FormConfigTotalType } from "~/types";
import { capitalize } from "~/utils";

export const getMounted = (formData: FormConfigTotalType): string => {
  const dynamicOptionsNodes = formData.fileds.filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC);
  if (dynamicOptionsNodes.length === 0) return "";

  const funcList = dynamicOptionsNodes.map(v => `get${capitalize(v.instance.model)}Options();`);

  return `onMounted(() => {
      ${funcList.join("\n")}
    })`;
};
