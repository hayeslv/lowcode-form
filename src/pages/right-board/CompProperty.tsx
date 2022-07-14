import { CirclePlus, Operation, Remove } from "@element-plus/icons-vue";
import { ElButton, ElDivider, ElForm, ElFormItem, ElIcon, ElInput } from "element-plus";
import { defineComponent, ref } from "vue";
import { EventName } from "~/config";
import { useActiveNode, useForm, useNodeList } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import type { IOptionType } from "~/lowform-meta/type";
import { events } from "~/plugins/events";

export default defineComponent({
  setup() {
    const { getNodeList } = useNodeList();
    const { getActiveNode } = useActiveNode();
    const { getForm, setFormValue } = useForm();

    const activeNode = ref(getActiveNode());
    const form = getForm();

    events.on(EventName.ActiveNodeUpdate, () => {
      activeNode.value = getActiveNode();
    });

    const onDefaultValueInput = (value: string, node: FormNode) => {
      const vModel = node.instance.model;
      // 从nodeList中找到绑定值是vModel的对象（可能有多个），将其更新
      getNodeList().forEach(v => {
        if (v.instance.model === vModel) {
          v.instance.defaultValue = value;
        }
      });
      // 更新form的值
      setFormValue(node.instance.model, value);
    };

    const selectMethods = {
      removeSelectOptions(node: FormNode, value: any) {
        const index = node.instance.options!.findIndex(v => v.value === value);
        node.instance.options?.splice(index, 1);
      },
      addSelectOption(node: FormNode) {
        node.instance.options?.push({ label: "", value: "" });
      },
    };

    return { form, activeNode, onDefaultValueInput, selectMethods };
  },
  render() {
    const optionsRender = (node: FormNode, options: IOptionType[]) => {
      const ItemRender = (item: IOptionType) => {
        return <div key={item.value} class="select-item">
          <ElIcon class="operation-btn" size={22}><Operation /></ElIcon>
          <ElInput v-model={item.label} placeholder="选项名" />
          <ElInput v-model={item.value} placeholder="选项值" />
          <ElIcon class="close-btn" size={22} {...{
            onClick: () => this.selectMethods.removeSelectOptions(node, item.value),
          }}><Remove /></ElIcon>
        </div>;
      };
      return <>
        <ElDivider>选项</ElDivider>
        { options.map(v => ItemRender(v)) }
        <div style="margin-left: 20px;">
          <ElButton icon={CirclePlus} type="primary" text onClick={() => this.selectMethods.addSelectOption(node)}>添加选项</ElButton>
        </div>
      </>;
    };

    const FormItemsRender = (node: FormNode) => {
      const instance = node.instance;
      return <>
        <ElFormItem label="组件类型：">{instance.key}</ElFormItem>
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
            modelValue={this.form[instance.model]}
            onInput={(value) => this.onDefaultValueInput(value, node)}
            placeholder="请输入默认值"
            clearable
          />
        </ElFormItem>
        { instance.options && optionsRender(node, instance.options) }
      </>;
    };

    return <ElForm labelWidth="90px">
      { this.activeNode && FormItemsRender(this.activeNode as FormNode) }
    </ElForm>;
  },
});
