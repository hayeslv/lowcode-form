import { ElForm, ElFormItem,  ElInput, ElSwitch } from "element-plus";
import { defineComponent, ref, watch } from "vue";
import { EventName } from "~/config";
import { useActiveNode, useForm, useFormConfig, useNodeList } from "~/hooks";
import type { FormNode, FormSelectNode, FormTimeNode } from "~/lowform-meta/instance/Node";
import { events } from "~/plugins/events";
import { columnRender, optionsRender, timeRender } from "./FormItemRender";
import { selectMethods } from "./methods";

export default defineComponent({
  setup() {
    const { getNodeList } = useNodeList();
    const { getActiveNode } = useActiveNode();
    const { getForm, setFormValue } = useForm();
    const { getFormConfig } = useFormConfig();

    const activeNode = ref(getActiveNode());
    const form = getForm();
    const formConfig = getFormConfig();

    events.on(EventName.ActiveNodeUpdate, () => {
      activeNode.value = getActiveNode();
    });

    const onDefaultValueInput = (value: string, node: FormNode) => {
      const vModel = node.instance.model;
      // 从nodeList中找到绑定值是vModel的对象（可能有多个），将其更新
      getNodeList().forEach(v => {
        if (v.instance.model === vModel) {
          if (Array.isArray(node.instance.defaultValue)) { // 如果是数组，则将value依据逗号拆成数组
            node.instance.defaultValue = value.length > 0 ? value.split(",") : [];
          } else {
            v.instance.defaultValue = value;
          }
        }
      });
      // 更新form的值
      setFormValue(node.instance.model, value);
    };

    watch(() => activeNode.value?.instance.optionsDataType, () => selectMethods.updateDynamicOptions(activeNode.value as FormSelectNode));

    return { form, formConfig, activeNode, onDefaultValueInput };
  },
  render() {
    const FormItemsRender = (node: FormNode | FormTimeNode) => {
      const instance = node.instance;

      return <>
        <ElFormItem label="组件类型：">{instance.key}</ElFormItem>
        {
          // 如果formConfig的column是2，则组件也可选择列数（渲染相应的配置项）
          this.formConfig.column === 2 &&  columnRender(node)
        }
        <ElFormItem label="标题：">
          <ElInput v-model={instance.label} placeholder="请输入标题(label)" clearable />
        </ElFormItem>
        <ElFormItem label="绑定值：">
          <ElInput v-model={instance.model} placeholder="请输入绑定值" clearable />
        </ElFormItem>
        {
          instance.placeholder !== undefined &&
          <ElFormItem label="占位提示：">
            <ElInput v-model={instance.placeholder} placeholder="请输入占位提示" clearable />
          </ElFormItem>
        }
        <ElFormItem label="标签宽度：">
          <ElInput v-model={instance.labelWidth} type="number" placeholder="请输入标签宽度" />
        </ElFormItem>
        <ElFormItem label="默认值：">
          <ElInput
            modelValue={instance.defaultValue?.toString()}
            onInput={(value) => this.onDefaultValueInput(value, node)}
            placeholder="请输入默认值"
            clearable
          />
        </ElFormItem>
        {
          // 如果存在options，则渲染相应options的配置项
          instance.options && optionsRender(node, instance.options)
        }
        {
          // 时间类组件的配置项
          (node as FormTimeNode).instance.format && timeRender(node as FormTimeNode)
        }
        <ElFormItem label="是否必填：">
          <ElSwitch v-model={instance.required}></ElSwitch>
        </ElFormItem>
        { instance.clearable !== undefined && <ElFormItem label="能否清空">
          <ElSwitch v-model={instance.clearable}></ElSwitch>
        </ElFormItem> }
      </>;
    };

    return <ElForm labelWidth="90px">
      { this.activeNode && FormItemsRender(this.activeNode as FormNode) }
    </ElForm>;
  },
});
