import { ElForm, ElFormItem, ElInput, ElRadioButton, ElRadioGroup } from "element-plus";
import { defineComponent, watch } from "vue";
import { debounce } from "lodash";
import { useFormConfig } from "~/hooks";

export default defineComponent({
  setup() {
    const { getFormConfig, setFormConfig } = useFormConfig();

    const formConfig = getFormConfig();

    const formConfigInput = (key, value) => {
      formConfig[key] = value;
    };

    watch(() => formConfig, debounce(() => {
      setFormConfig(formConfig);
    }, 300), { deep: true });

    // 默认一列
    !formConfig.column && (formConfig.column = 1);

    return { formConfig, formConfigInput };
  },
  render() {
    return <ElForm label-width="90px">
      <ElFormItem label="列数：">
        <ElRadioGroup class="form-column-radio-group" v-model={this.formConfig.column}>
          <ElRadioButton label={1}>1列</ElRadioButton>
          <ElRadioButton label={2}>2列</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="表单名：">
        <ElInput modelValue={this.formConfig.formRef} onInput={(value) => this.formConfigInput("formRef", value)} placeholder="请输入表单名（ref）"/>
      </ElFormItem>
      <ElFormItem label="表单模型：">
        <ElInput modelValue={this.formConfig.formModel} onInput={(value) => this.formConfigInput("formModel", value)} placeholder="请输入数据模型（model）"/>
      </ElFormItem>
      <ElFormItem label="校验模型：">
        <ElInput modelValue={this.formConfig.formRules} onInput={(value) => this.formConfigInput("formRules", value)} placeholder="请输入校验模型"/>
      </ElFormItem>
      <ElFormItem label="标签宽度：">
        <ElInput modelValue={this.formConfig.labelWidth} onInput={(value) => this.formConfigInput("labelWidth", value)} placeholder="请输入标签宽度"/>
      </ElFormItem>
    </ElForm>;
  },
});
