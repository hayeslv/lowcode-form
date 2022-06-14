import { ElForm, ElFormItem, ElInput, ElSlider } from "element-plus";
import { defineComponent } from "vue";
import { useActiveComp } from "~/hooks";

export default defineComponent({
  setup() {},
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
    </ElForm>;
  },
});
