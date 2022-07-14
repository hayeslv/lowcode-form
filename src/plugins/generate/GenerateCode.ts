import type { FormConfigTotalType, GenerateCodeType } from "~/types";

export class GenerateCode {
  //* 表单配置 */
  private _formData: FormConfigTotalType;
  //* 页面类型：表单、弹窗 */
  private _pageType: GenerateCodeType;
  //* 最终生成的代码 */
  private _code: string = "";

  constructor(formData: FormConfigTotalType, type: GenerateCodeType) {
    this._formData = formData;
    this._pageType = type;
  }

  get code() {
    return this._code;
  }
}
