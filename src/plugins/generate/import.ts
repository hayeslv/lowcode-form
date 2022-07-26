import type { FormConfigTotalType, GenerateCodeType } from "~/types";
import { getHtml } from "./html";
import { getSetup } from "./setup";

export const getImport = (formData: FormConfigTotalType, pageType: GenerateCodeType) => {
  const elTags = getHtml(formData, pageType).match(/El\w*/g);
  const shouldImportStr = [...new Set(elTags)].join(", ");

  const vueImportList = ["reactive", "ref", "onMounted"];
  const setup = getSetup(formData, pageType);
  const vueImportStr = vueImportList.filter(v => setup.includes(v)).join(", ");

  // 获取icon导入
  let iconStr = "";
  if (formData.fileds.find(v => v.instance.prefixIcon || v.instance.suffixIcon)) {
    let list = formData.fileds
      .filter(v => v.instance.prefixIcon || v.instance.suffixIcon)
      .reduce((pre, cur) => {
        if (cur.instance.prefixIcon) pre.push(cur.instance.prefixIcon);
        if (cur.instance.suffixIcon) pre.push(cur.instance.suffixIcon);
        return pre;
      }, [] as string[]);
    // 去重
    list = [...new Set(list)];
    iconStr = list.join(", ");
  }

  return `import { defineComponent, ${vueImportStr} } from "vue";
    import { ${shouldImportStr} } from "element-plus";
    ${iconStr === "" ? "" : `import { ${iconStr} } from "@element-plus/icons-vue";`}
    import "./test.scss"`;
};
