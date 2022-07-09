import { CopyDocument, Delete } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
import { cloneDeep } from "lodash";
import type { PropType } from "vue";
import { watch, defineComponent } from "vue";
import { useActiveNode, useDragging, useNodeList } from "~/hooks";
import { FormNode } from "~/lowform-meta/instance/Node";
import { wrapFormItem } from "~/utils";
import { useNodeDragger } from "./hooks/useNodeDragger";

export default defineComponent({
  props: {
    node: { type: Object as PropType<FormNode>, required: true },
  },
  setup(props) {
    const { getDragging } = useDragging();
    const { addNode, deleteNode } = useNodeList();
    const { getActiveNode } = useActiveNode();
    const { click, dragstart, dragend, dragenter } = useNodeDragger();

    const nodeMethods = {
      copy(e: MouseEvent) {
        e.stopPropagation();
        const form = new FormNode(cloneDeep(props.node.instance));
        form.updateId();
        addNode(form);
      },
      delete(e: MouseEvent) {
        e.stopPropagation();
        deleteNode(props.node);
      },
    };

    const instance = props.node.instance;
    const nodeRender = instance.render();
    const render = () => wrapFormItem(nodeRender, { label: instance.label });
    const btnRender = () => {
      return [
        <span class="drawing-item-copy" title="复制" onClick={(e: MouseEvent) => nodeMethods.copy(e)}>
          <ElIcon size={14}><CopyDocument /></ElIcon>
        </span>,
        <span class="drawing-item-delete" title="删除" onClick={(e: MouseEvent) => nodeMethods.delete(e)}>
          <ElIcon size={14}><Delete /></ElIcon>
        </span>,
      ];
    };

    return () => <div
      draggable={true}
      class={[
        "drawing-item",
        getDragging() && (getDragging()!.instance.id === instance.id) && "sortable-ghost", // 拖拽时node顶部的线
        getActiveNode() && (getActiveNode()!.instance.id === instance.id) && "active-from-item",
      ]}
      onClick={(e: MouseEvent) => click(e, props.node)}
      onDragstart={(e: DragEvent) => dragstart(e, props.node)}
      onDragend={dragend}
      onDragenter={(e: DragEvent) => dragenter(e, props.node)}
    >
      { render() }
      { btnRender() }
    </div>;
  },
});
