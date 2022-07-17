import { capitalize } from "./../../utils/shared";
import { useFormConfig } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { EOptionsDataType } from "~/lowform-meta/type";
import type { FormConfigTotalType } from "~/types";
import { GenerateCodeType } from "~/types";
import { tagMap } from "./tagMap";

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

const wrapForm = (codeStr: string) => {
  const formConfig = getFormConfig();
  const className = formConfig.column === 2 ? "half" : null;
  const classStr = className ? ` class="${className}"` : "";

  return `<ElForm${classStr} ref={${formConfig.formRef}} model={${formConfig.formModel}} label-width="${formConfig.labelWidth}px">
  ${codeStr}
</ElForm>`;
};

const wrapDialog = (str: string) => {
  return `<ElDialog 
  modelValue={props.visible} 
  title="Dialog Title"
  v-slots={{ 
    footer:  () => <div class="dialog-footer">
    <ElButton onClick={() => emit("update:visible", false)}>取消</ElButton>
    <ElButton type="primary" onClick={() => emit("update:visible", false)}>确定</ElButton>
  </div>
  }}>
    ${str}
  </ElDialog>`;
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
    return `${this.import}
    export default defineComponent({
      ${this.props ? this.props + ",\n" : ""}${this.setup}
    })
    ${this.css}
    `;
  }

  get _html() {
    // 每个node的html
    const codeList = this.getNodesCode();
    // 转为字符串
    let codeStr = codeList.join("\n");

    codeStr = wrapForm(codeStr);

    if (this._pageType === GenerateCodeType.Dialog) {
      codeStr = wrapDialog(codeStr);
    }

    return codeStr;
  }

  // TODO 使用this._setup，做缓存
  get setup() {
    const valueChange = (value: string | string[]) => {
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

    const formDataStr = [...new Set(
      this._formData.fileds
        .map(v => ({
          key: v.instance.model,
          value: v.instance.defaultValue || "",
        }))
        .map(v => `${v.key}: ${valueChange(v.value)}`),
    )].join(",\n");

    const formRef = `const ${this._formData.formRef} = ref()`;
    const formModel = `const ${this._formData.formModel} = reactive({
      ${formDataStr}
    })`;

    const options = this._formData.fileds
      .filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC)
      .map(v => `${v.instance.model}Options: []`)
      .join(",\n");

    // options配置
    const formOptions = options !== ""
      ? `const formOptions = reactive({
        ${options}
      })`
      : "";

    return `setup(props, { emit }) {
      ${formRef}
      ${formModel}
      ${formOptions}
      ${this.methods}
      ${this.mounted}\n
      return () => ${this._html}
    }`;
  }

  get mounted() {
    const dynamicOptionsNodes = this._formData.fileds.filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC);
    if (dynamicOptionsNodes.length === 0) return "";

    const funcList = dynamicOptionsNodes.map(v => `get${capitalize(v.instance.model)}Options();`);

    return `onMounted(() => {
      ${funcList.join(",\n")}
    })`;
  }

  get methods() {
    const dynamicOptionsNodes = this._formData.fileds.filter(v => v.instance.optionsDataType === EOptionsDataType.DYNAMIC);
    return dynamicOptionsNodes.map(v => `const get${capitalize(v.instance.model)}Options = async () => {
      const response = await fetch("${v.instance.optionsUrl}", { method: "${v.instance.optionsUrlMethod?.toUpperCase()}" });
      const list = await response.json();
      formOptions.${v.instance.model}Options = list;
    }`);
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

  get import() {
    const elTags = this._html.match(/El\w*/g);
    const shouldImportStr = [...new Set(elTags)].join(", ");

    const vueImportList = ["reactive", "ref", "onMounted"];
    const vueImportStr = vueImportList.filter(v => this.setup.includes(v)).join(", ");

    return `import { defineComponent, ${vueImportStr} } from "vue";
    import { ${shouldImportStr} } from "element-plus";
    import "./test.scss"`;
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
