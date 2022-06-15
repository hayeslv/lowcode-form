import { ElForm, ElFormItem, ElInput } from "element-plus";
import { defineComponent, watch } from "vue";
import { debounce } from "lodash";
import { useFormConfig } from "~/utils";

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

    return { formConfig, formConfigInput };
  },
  render() {
    return <ElForm label-width="90px">
      <ElFormItem label="表单名：">
        <ElInput modelValue={this.formConfig.formRef} onInput={(value) => this.formConfigInput("formRef", value)} placeholder="请输入表单名（ref）" />
      </ElFormItem>
      <ElFormItem label="表单模型：">
        <ElInput v-model={this.formConfig.formModel} placeholder="请输入数据模型（model）" />
      </ElFormItem>
      <ElFormItem label="校验模型：">
        <ElInput v-model={this.formConfig.formRules} placeholder="请输入校验模型" />
      </ElFormItem>
      <ElFormItem label="标签宽度：">
        <ElInput v-model={this.formConfig.labelWidth} placeholder="请输入标签宽度" />
      </ElFormItem>
    </ElForm>;
  },
});
