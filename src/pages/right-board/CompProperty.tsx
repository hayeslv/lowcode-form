import { ElButton, ElDivider, ElForm, ElFormItem, ElIcon, ElInput, ElSlider } from "element-plus";
import { CirclePlus, Operation, Remove } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import { onDefaultValueInput } from "~/config";
import { useActiveComp, useForm } from "~/hooks";
import type { IComponent } from "~/types";

export default defineComponent({
  setup() {
    const { getForm } = useForm();
    const form = getForm();

    const selectMethods = {
      addSelectOption(component: IComponent) {
        component.__slot__!.options.push({ label: "", value: "" });
      },
      removeSelectOptions(component: IComponent, index: number) {
        component.__slot__!.options.splice(index, 1);
      },
    };

    return { form, selectMethods };
  },
  render() {
    const { getActiveComp } = useActiveComp();
    const component = getActiveComp()!;
    // 选项
    const options = component.__slot__ && component.__slot__.options;
    const optionsRender = options && <>
      <ElDivider>选项</ElDivider>
      {options!.map((v, i) => <div key={i} class="select-item">
        <ElIcon class="operation-btn" size={22}><Operation /></ElIcon>
        <ElInput v-model={v.label} placeholder="选项名" />
        <ElInput v-model={v.value} placeholder="选项值" />
        <ElIcon class="close-btn" size={22} {...{ onClick: () => this.selectMethods.removeSelectOptions(component, i) }}><Remove /></ElIcon>
      </div>)}
      <div style="margin-left: 20px;">
        <ElButton icon={CirclePlus} type="primary" text onClick={() => this.selectMethods.addSelectOption(component)}>添加选项</ElButton>
      </div>
      <ElDivider />
    </>;

    return <ElForm label-width="90px">
      <ElFormItem label="组件类型：">{component.key}</ElFormItem>
      <ElFormItem label="标题：">
        <ElInput v-model={component.label} placeholder="请输入标题" clearable />
      </ElFormItem>
      <ElFormItem label="绑定值：">
        <ElInput v-model={component.__vModel__} placeholder="请输入绑定值" clearable />
      </ElFormItem>
      <ElFormItem label="占位提示：">
        <ElInput v-model={component.placeholder} placeholder="请输入占位提示" clearable />
      </ElFormItem>
      {
        component.__config__.span !== undefined &&
        <ElFormItem label="表单栅格：">
          <ElSlider v-model={component.__config__.span} min={1} max={24} marks={{ 12: "" }} />
        </ElFormItem>
      }
      <ElFormItem label="标签宽度：">
        <ElInput v-model={component.__config__.labelWidth} type="number" placeholder="请输入标签宽度" />
      </ElFormItem>
      <ElFormItem label="默认值：">
        <ElInput
          modelValue={this.form[component.__vModel__!]}
          onInput={(value) => onDefaultValueInput(value, component)}
          placeholder="请输入默认值"
          clearable
        />
      </ElFormItem>
      {optionsRender}
    </ElForm>;
  },
});
