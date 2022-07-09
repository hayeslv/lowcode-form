import { ElForm, ElFormItem, ElInput } from "element-plus";
import { defineComponent, ref } from "vue";
import { EventName } from "~/config";
import { useActiveNode } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { events } from "~/plugins/events";

export default defineComponent({
  setup() {
    const { getActiveNode } = useActiveNode();
    const activeNode = ref(getActiveNode());

    events.on(EventName.ActiveNodeUpdate, () => {
      activeNode.value = getActiveNode();
    });

    return { activeNode };
  },
  render() {
    const FormItemsRender = (node: FormNode) => {
      const instance = node.instance;
      return <>
        <ElFormItem label="组件类型：">{instance.key}</ElFormItem>
        <ElFormItem label="标题：">
          <ElInput v-model={instance.label} placeholder="请输入标题(label)" clearable />
        </ElFormItem>
      </>;
    };

    return <ElForm labelWidth="90px">
      { this.activeNode && FormItemsRender(this.activeNode as FormNode) }
    </ElForm>;
  },
});
