import type { FormSelectNode } from "~/lowform-meta/instance/Node";
import type { IFormSelectNodeInstance } from "~/lowform-meta/type";
import { EOptionsDataType } from "~/lowform-meta/type";
import type { FormConfigTotalType } from "~/types";
import { capitalize } from "~/utils";

export const getMothods = (formData: FormConfigTotalType): string => {
  const dynamicOptionsNodes = formData.fileds.filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC);
  const getListStr = (ins: IFormSelectNodeInstance) => {
    return `const list = (${ins.reqDataPosition ? `json.${ins.reqDataPosition}` : "json"} || []).map(v => ({ label: v.${ins.reqLabelName || "label"}, value: v.${ins.reqValueName || "value"} }));`;
  };
  return dynamicOptionsNodes.map(v => {
    const instance = (v as (FormSelectNode)).instance;
    return `const get${capitalize(v.instance.model)}Options = async () => {
        const response = await fetch("${v.instance.optionsUrl}", { method: "${v.instance.optionsUrlMethod?.toUpperCase()}" });
        const json = await response.json(); ${instance.reqDataPosition ? `\n${getListStr(instance)}` : ""}
        formOptions.${v.instance.model}Options = ${instance.reqDataPosition ? "list" : "json"};
      }`;
  }).join("\n");
};
