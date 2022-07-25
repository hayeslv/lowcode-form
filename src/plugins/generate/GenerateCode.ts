import { useFormConfig } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { FormConfigTotalType } from "~/types";
import { GenerateCodeType } from "~/types";
import { tagMap } from "./tagMap";
import { getSetup } from "./setup";
import { getImport } from "./import";

const { getFormConfig } = useFormConfig();

const wrapFormItem = (node: FormNode, tagDom: string) => {
  const formConfig = getFormConfig();

  let labelWidth = "";
  if (node.instance.labelWidth) labelWidth = ` label-width="${node.instance.labelWidth}px"`;

  const label = `label="${node.instance.label}"`;
  const prop = `prop="${node.instance.model}"`;

  const className = (formConfig.column === 2) && (node.instance.column === 2) ? "full" : null;
  const classStr = className ? ` class="${className}"` : "";

  return `<ElFormItem${classStr}${labelWidth} ${label} ${prop}>
    ${tagDom}
  </ElFormItem>`;
};

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

  get code() {
    const importStr = getImport(this._formData, this._pageType);
    return `${importStr}
    export default defineComponent({
      ${this.props ? this.props + ",\n" : ""}${this.setup}
    })
    ${this.css}
    `;
  }

  // TODO 使用this._setup，做缓存（dirty参数）
  get setup() {
    const setup = getSetup(this._formData, this._pageType);
    return setup;
  }

  get props() {
    let propsCode: string | null = null;
    // TODO 目前只有dialog需要用到props.visible，这里先写死，以后再考虑动态化
    if (this._pageType === GenerateCodeType.Dialog) {
      propsCode = `props: {
        visible: { type: Boolean, default: false },
      }`;
    }
    return propsCode;
  }

  get css() {
    return `
    // .el-form {
    //   display: flex;
    //   flex-wrap: wrap;
    //   &.half {
    //     > .el-form-item {
    //       width: 50%;
    //     }
    //   }
    //   > .el-form-item {
    //     display: flex;
    //     align-items: flex-start;
    //     width: 100%;
    //     &.full {
    //       width: 100%;
    //     }
    //   }
    // }
    `;
  }

  // 获取全部node节点的code字符串（包裹了form-item）
  getNodesCode() {
    const nodes = this._formData.fileds; // 当前画布中的元素
    const codeList: string[] = [];
    nodes.forEach(node => {
      let code = tagMap[node.instance.key](node); // 获得组件tag字符串
      code = wrapFormItem(node, code); // 包裹form-item
      codeList.push(code);
    });
    return codeList;
  }
}
