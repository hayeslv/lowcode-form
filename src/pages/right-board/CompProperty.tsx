import { ElForm, ElFormItem, ElInput } from "element-plus";
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
    </ElForm>;
  },
});
