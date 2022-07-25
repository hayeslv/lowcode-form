import type { FormConfigTotalType, GenerateCodeType } from "~/types";
import { getSetup } from "./setup";
import { getImport } from "./import";
import { getCss } from "./css";
import { getProps } from "./props";

/**
 * 生成代码流程：
 * 1、生成setup
 *    1、生成html部分（setup的return）
 *      1、生成对应的组件列表code-string
 *      2、包裹form-item
 *      3、包裹form
 *      4、如果是Dialog，则再包裹一层Dialog
 *    2、生成formData（参数部分）
 *    3、包裹setup
 * 2、生成props
 * 3、使用defineComponent包裹全部配置项
 * 4、生成import内容
 */
export class GenerateCode {
  //* 表单配置 */
  private _formData: FormConfigTotalType;
  //* 页面类型：表单、弹窗 */
  private _pageType: GenerateCodeType;

  constructor(formData: FormConfigTotalType, type: GenerateCodeType) {
    this._formData = formData;
    this._pageType = type;
  }

  // TODO 做缓存（dirty参数）
  get code() {
    const importStr = getImport(this._formData, this._pageType);
    const props = getProps(this._pageType);
    const setup = getSetup(this._formData, this._pageType);
    const css = getCss();

    return `${importStr}
      export default defineComponent({
        ${props ? props + ",\n" : ""}${setup}
      })
      ${css}
    `;
  }
}
