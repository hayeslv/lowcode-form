import type { ElementComponent } from "~/config";
import type { FormConfigTotalType } from "~/types";

// let globalConfig: FormConfigTotalType; // 全局配置

interface KeyValue {
  key: string | number;
  value: string;
}

// 构建参数
const buildAttributes = (component: ElementComponent, dataList: KeyValue[]) => {
  buildData(component, dataList);
};

// 构建data数据
const buildData = (component: ElementComponent, dataList: KeyValue[]) => {
  if (component.__vModel__ === undefined) return;
  dataList.push({
    key: component.__vModel__,
    value: component.__config__.defaultValue || "",
  });
};

// 构建js代码
const buildJsCode = (formData: FormConfigTotalType, dataList: KeyValue[], html: string) => {
  const dataStr = dataList.map(v => `${v.key}: "${v.value}"`).join(",\n");
  const str = `const elForm = ref();
  const ${formData.formModel} = reactive({
    ${dataStr}
  })`;
  return `setup() {
    ${str}
    ${html}
  }`;
};

/**
 * 组装js代码。【入口函数】
 *
 * @param {FormConfigTotalType} formData 整个表单的配置
 */
export const makeUpJs = (formData: FormConfigTotalType, html: string) => {
  // globalConfig = formData;
  const dataList: KeyValue[] = []; // 组件数据参数

  formData.fileds.forEach(component => {
    buildAttributes(component, dataList);
  });

  const script = buildJsCode(formData, dataList, html);

  return script;
};
