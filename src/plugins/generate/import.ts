import type { FormConfigTotalType, GenerateCodeType } from "~/types";
import { getHtml } from "./html";
import { getSetup } from "./setup";

export const getImport = (formData: FormConfigTotalType, pageType: GenerateCodeType) => {
  const elTags = getHtml(formData, pageType).match(/El\w*/g);
  const shouldImportStr = [...new Set(elTags)].join(", ");

  const vueImportList = ["reactive", "ref", "onMounted"];
  const setup = getSetup(formData, pageType);
  const vueImportStr = vueImportList.filter(v => setup.includes(v)).join(", ");

  return `import { defineComponent, ${vueImportStr} } from "vue";
    import { ${shouldImportStr} } from "element-plus";
    import "./test.scss"`;
};
