import { ElForm, ElFormItem, ElInput, ElSlider } from "element-plus";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";
import { useForm } from "~/config";
import { useActiveComp, useDrawingList } from "~/hooks";

export default defineComponent({
  setup() {
    const { drawingList } = useDrawingList();
    const { getForm } = useForm();
    const form = getForm();

    const onDefaultValueInput = (value, component: ElementComponent) => {
      const vModel = component.__vModel__;
      drawingList.value.forEach(v => {
        if (v.__vModel__ === vModel) {
          v.__config__.defaultValue = value;
        }
      });
      form[component.__vModel__] = value;
    };

    return { form, onDefaultValueInput };
  },
  render() {
    const { getActiveComp } = useActiveComp();
    const component = getActiveComp()!;
    return <ElForm label-width="90px">
      <ElFormItem label="组件类型：">{component.typeName}</ElFormItem>
      <ElFormItem label="标题：">
        <ElInput v-model={component.label} placeholder="请输入标题" clearable />
      </ElFormItem>
      <ElFormItem label="绑定值：">
        <ElInput v-model={component.__vModel__} placeholder="请输入绑定值" clearable />
      </ElFormItem>
      <ElFormItem label="占位提示：">
        <ElInput v-model={component.placeholder} placeholder="请输入占位提示" clearable />
      </ElFormItem>
      { component.__config__.span !== undefined && <ElFormItem label="表单栅格：">
        <ElSlider v-model={component.__config__.span} min={1} max={24} marks={{ 12: "" }} />
      </ElFormItem> }
      <ElFormItem label="标签宽度：">
        <ElInput v-model={component.__config__.labelWidth} type="number" placeholder="请输入标签宽度" />
      </ElFormItem>
      <ElFormItem label="默认值：">
        {/* <ElInput v-model={form[component.__vModel__]} placeholder="请输入默认值" clearable /> */}
        {/* <ElInput modelValue={component.__config__.defaultValue} onInput={(value) => (component.__config__.defaultValue = value)} placeholder="请输入默认值" clearable /> */}
        <ElInput
          modelValue={this.form[component.__vModel__]}
          onInput={(value) => this.onDefaultValueInput(value, component)}
          placeholder="请输入默认值"
          clearable
        />
      </ElFormItem>
    </ElForm>;
  },
});
