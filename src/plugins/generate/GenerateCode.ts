import type { ElementComponent } from "~/config";
import type { FormConfigTotalType } from "~/types";

interface KeyValue {
  key: string | number;
  value: string;
}

let globalConfig: FormConfigTotalType; // 全局配置

// 生成的代码类型
export const enum CodeType {
  Page = "page",
  Dialog = "dialog",
}

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
    // return `<${tag} ${vModel} ${placeholder}></${tag}>`;
    return `<ElInput ${vModel} ${placeholder} />`;
  },
  textarea: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    // return `<${tag} type="textarea" ${vModel} ${placeholder}></${tag}>`;
    return `<ElInput type="textarea" ${vModel} ${placeholder} />`;
  },
  number: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    // return `<${tag} ${vModel} ${placeholder}></${tag}>`;
    return `<ElInputNumber ${vModel} ${placeholder} />`;
  },
  password: (el: ElementComponent) => {
    const { vModel, placeholder } = attrBuilder(el);
    // return `<${tag} type="password" show-password ${vModel} ${placeholder}></${tag}>`;
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
  return `<el-dialog v-model="dialogVisible" title="Dialog Title">
    ${str}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>`;
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

export class GenerateCode {
  private _code = "";
  private _formData: FormConfigTotalType | null = null;
  constructor(formData: FormConfigTotalType) {
    this._formData = formData;
    globalConfig = formData;
  }

  get code() {
    return this._code;
  }

  // 组装html代码（setup的返回部分）
  makeUpHtml(type: CodeType) {
    const elements = this._formData!.fileds; // 当前画布的元素
    const htmlList: string[] = [];

    // 遍历渲染每个组件的html
    elements.forEach(el => {
      htmlList.push(layouts[el.layout](el));
    });
    // 转换为字符串
    const htmlStr = htmlList.join("\n");
    // 将组件代码放进form标签
    let template = buildFormWrap(this._formData!, htmlStr);
    // dialog标签包裹代码
    if (type === CodeType.Dialog) {
      template = dialogWrapper(template);
    }

    this._code = `return () => ${template}`;

    return this;
  }

  // 生成setup函数
  buildSetup() {
    const dataList: KeyValue[] = []; // 组件数据参数

    this._formData!.fileds.forEach(component => {
      buildAttributes(component, dataList);
    });

    const setupAttr = this._buildJsCode(dataList);
    this._code = setupAttr;

    return this;
  }

  private _buildJsCode(dataList: KeyValue[]) {
    const dataStr = dataList.map(v => `${v.key}: "${v.value}"`).join(",\n");
    const str = `const elForm = ref();
    const ${this._formData!.formModel} = reactive({
      ${dataStr}
    })`;
    return `setup() {
      ${str}
      ${this._code}
    }`;
  }

  // 包裹defineComponent
  defineComponentWrap() {
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

// export const dialogWrapper = (str: string) => {
//   return `<el-dialog v-model="dialogVisible" title="Dialog Title">
//     ${str}
//     <template #footer>
//       <span class="dialog-footer">
//         <el-button @click="dialogVisible = false">取消</el-button>
//         <el-button type="primary" @click="dialogVisible = false">确定</el-button>
//       </span>
//     </template>
//   </el-dialog>`;
// };
