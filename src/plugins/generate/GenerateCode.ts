import type { ElementComponent } from "~/config";
import type { FormConfigTotalType } from "~/types";
import { GenerateCodeType  } from "~/types";

let globalConfig: FormConfigTotalType; // 全局配置

// 布局
const layouts = {
  colFormItem(component: ElementComponent) {
    const config = component.__config__;
    let labelWidth = "";
    const label = `label="${component.label}"`;

    if (config.labelWidth && config.labelWidth !== globalConfig.labelWidth) {
      // 当前组件配置的labelWidth存在；并且和全局的labelWidth不一样（如果一样的话也就不需要再配置这里了）
      labelWidth = `label-width="${config.labelWidth}px"`;
    }
    const tagDom = tags[component.type] ? tags[component.type](component) : null;

    let str = `<ElFormItem ${labelWidth} ${label} prop="${component.__vModel__}">
      ${tagDom}
    </ElFormItem>`;
    str = colWrapper(component, str);
    return str;
  },
};

// span不为24的用el-col包裹
const colWrapper = (component: ElementComponent, str: string) => {
  if (component.__config__.span !== 24) {
    return `<ElCol span={${component.__config__.span}}>
      ${str}
    </ElCol>`;
  }
  return str;
};

// 组装相对应的tag
// TODO 改为注册的方式
const tags = {
  input: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    return `<ElInput ${vModel} ${placeholder} />`;
  },
  textarea: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    return `<ElInput type="textarea" ${vModel} ${placeholder} />`;
  },
  number: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    return `<ElInputNumber ${vModel} ${placeholder} />`;
  },
  password: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    return `<ElInput type="password" showPassword ${vModel} ${placeholder} />`;
  },
};

const attrBuilder = (el: ElementComponent) => {
  return {
    tag: el.tag,
    vModel: `v-model={${globalConfig.formModel}.${el.__vModel__}}`,
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : "",
  };
};

/**
 * 组装Form表单：外层包裹form
 *
 * @param {FormConfigTotalType} formData 整体表单配置
 * @param {string} children 内容
 */
const buildFormWrap = (formData: FormConfigTotalType, children: string) => {
  const str = `<ElForm ref={${formData.formRef}} model={${formData.formModel}} label-width="${formData.labelWidth}px">
    ${children}
  </ElForm>`;
  return str;
};

export const dialogWrapper = (str: string) => {
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
 * 1、setup配置项
 *    1-生成setup的return部分
 *        1-根据“组件列表”中的组件类型，生成对应的组件
 *        2-包裹ElFormItem
 *        3-根据条件判断是否包裹ElCol
 *        4-包裹ElForm
 *        5-如果是dialog，就在外面包裹一层dialog
 *    2-生成setup的formData（reactive）部分
 *    3-使用setup参数包裹
 * 2、props配置项
 *    1-生成props
 * 3、使用defineComponent包裹全部配置项
 * 4、生成import内容
 */
export class GenerateCode {
  //* 表单配置 */
  private _formData: FormConfigTotalType;
  //* 生成的代码类型：表单、弹窗 */
  private _codeType: GenerateCodeType;
  //* props配置 */
  private _propsCode = "";
  //* 最终生成的代码 */
  private _code = "";

  constructor(formData: FormConfigTotalType, type: GenerateCodeType) {
    this._formData = formData;
    this._codeType = type;

    globalConfig = formData;
  }

  get code() {
    return this._code;
  }

  // 组装html代码（setup的返回部分）
  makeUpHtml() {
    const elements = this._formData.fileds; // 当前画布的元素
    const htmlList: string[] = [];

    // 遍历渲染每个组件的html
    elements.forEach(el => {
      htmlList.push(layouts[el.layout](el));
    });
    // 转换为字符串
    const htmlStr = htmlList.join("\n");
    // 将组件代码放进form标签
    let template = buildFormWrap(this._formData, htmlStr);
    // dialog标签包裹代码
    if (this._codeType === GenerateCodeType.Dialog) {
      template = dialogWrapper(template);
    }

    this._code = `return () => ${template}`;

    return this;
  }

  // 生成props配置
  private _buildProps() {
    // TODO 目前只有dialog需要用到props.visible，这里先写死，以后再考虑动态化
    if (this._codeType === GenerateCodeType.Dialog) {
      this._propsCode = `props: {
        visible: { type: Boolean, default: false },
      },`;
      this._code = `${this._propsCode}
        ${this._code}
      `;
    }
  }

  // 生成setup函数
  buildSetup() {
    // 获得formData的字符串键值对形式："key: value, key: value"
    const dataStr = this._formData.fileds
      .map(v => ({
        key: v.__vModel__,
        value: v.__config__.defaultValue || "",
      }))
      .map(v => `${v.key}: "${v.value}"`)
      .join(",\n");

    // 参数声明（elForm、formData）
    const str = `const ${this._formData.formRef} = ref();
    const ${this._formData.formModel} = reactive({
      ${dataStr}
    })`;

    // 包裹setup
    this._code = `setup(props, {emit}) {
      ${str}
      ${this._code}
    }`;

    return this;
  }

  // 包裹defineComponent
  defineComponentWrap() {
    this._buildProps();
    this._code = `export default defineComponent({
      ${this._code}
    })`;

    return this;
  }

  // 添加import
  buildScriptImport() {
    this._code = `import { defineComponent, reactive, ref } from "vue";
    import { ElForm, ElFormItem, ElInput, ElInputNumber } from "element-plus";\n
      ${this._code}`;

    return this;
  }
}
