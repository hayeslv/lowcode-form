import type { FormConfigTotalType, GenerateCodeType } from "~/types";
import { tagMap } from "./tagMap";

export class GenerateCode {
  //* 表单配置 */
  private _formData: FormConfigTotalType;
  //* 页面类型：表单、弹窗 */
  private _pageType: GenerateCodeType;
  //* 最终生成的代码 */
  private _code: string = "";
  //* 元素生成的代码列表 */
  private _htmlList: string[];

  constructor(formData: FormConfigTotalType, type: GenerateCodeType) {
    this._formData = formData;
    this._pageType = type;
  }

  get code() {
    this.makeUpHtml();

    return this._code;
  }

  // 组装html代码（setup的返回部分）
  makeUpHtml() {
    const elements = this._formData.fileds; // 当前画布中的元素
    const htmlList: string[] = elements.map(node => tagMap[node.instance.key](node));

    this._htmlList = htmlList;
  }
}
