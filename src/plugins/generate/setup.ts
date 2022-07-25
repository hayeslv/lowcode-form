import type { FormItemRule } from "element-plus";
import { EOptionsDataType } from "~/lowform-meta/type";
import type { FormConfigTotalType } from "~/types";
import { GenerateCodeType } from "~/types";
import { getHtml } from "./html";
import { getMothods } from "./methods";
import { getMounted } from "./mounted";

const valueChange = (value: number | string | string[] | boolean) => {
  if (typeof value === "boolean") return Boolean(value);
  if (typeof value === "number") return Number(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";

    const valueStr = value.reduce((str, now) => {
      str += `,"${now}"`;
      return str;
    }, "").slice(1);
    return `[${valueStr}]`;
  } else {
    return `"${value}"`;
  }
};

// 获取form的model
const getFormModel = (formData: FormConfigTotalType): string => {
  const formDataStr = [...new Set(
    formData.fileds
      .map(v => ({
        key: v.instance.model,
        value: (v.instance.defaultValue === undefined || v.instance.defaultValue === null) ? "" : v.instance.defaultValue,
      }))
      .map(v => `${v.key}: ${valueChange(v.value)}`),
  )].join(",\n");
  const formModel = `const ${formData.formModel} = reactive({
    ${formDataStr}
  })`;

  return formModel;
};

const getFormRules = (formData: FormConfigTotalType): string => {
  const rules = formData.fileds
    .filter(v => v.instance.required || (v.instance.regList && v.instance.regList.length !== 0)) // 必填、规则列表不为空
    .map(v => {
      const ins = v.instance;
      const list: string[] = [];
      if (ins.required) list.push(`{ required: ${ins.required}, message: "请输入", trigger: "blur" }`);
      if (ins.regList && ins.regList.length !== 0) {
        ins.regList.forEach((reg: FormItemRule) => list.push(`{ pattern: ${reg.pattern}, message: "${reg.message}", trigger: "blur" }`));
      }

      return `${ins.model}: [\n${list.join(",\n")}\n]`;
    });

  const formRules = `const ${formData.formRules} = reactive({
    ${rules.join(",\n")}
  })`;

  return formRules;
};

const getFormOptions = (formData: FormConfigTotalType): string => {
  const options = formData.fileds
    .filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC)
    .map(v => `${v.instance.model}Options: []`)
    .join(",\n");

  // options配置
  const formOptions = options !== ""
    ? `const formOptions = reactive({
        ${options}
      })`
    : "";

  return formOptions;
};

export const getSetup = (formData: FormConfigTotalType, pageType: GenerateCodeType): string => {
  // setup参数（props和emit）：目前当只有Dialog时才会用到
  const setupParam = pageType === GenerateCodeType.Dialog ? "props, { emit }" : "";
  // 获取form的dom的ref
  const formRef = `const ${formData.formRef} = ref()`;
  const formModel = getFormModel(formData);
  const formRules = getFormRules(formData);
  const formOptions = getFormOptions(formData);
  const methods = getMothods(formData);
  const mounted = getMounted(formData);
  const html = getHtml(formData, pageType);

  // return () => ${this._html}
  return `setup(${setupParam}) {
    ${formRef}
    ${formModel}
    ${formRules}
    ${formOptions}
    ${methods}
    ${mounted}\n
    return () => ${html}
  }`;
};
