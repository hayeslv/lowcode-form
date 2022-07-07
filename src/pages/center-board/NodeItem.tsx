import type { PropType } from "vue";
import { defineComponent } from "vue";
import { useActiveNode, useDragging } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { wrapFormItem } from "~/utils";
import { useNodeDragger } from "./hooks/useNodeDragger";

export default defineComponent({
  props: {
    node: { type: Object as PropType<FormNode>, required: true },
  },
  setup(props) {
    const { getDragging } = useDragging();
    const { getActiveNode } = useActiveNode();
    const { click, dragstart, dragend, dragenter } = useNodeDragger();

    const instance = props.node.instance;
    const nodeRender = instance.render();
    const render = wrapFormItem(nodeRender, { label: instance.label });
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
      { render }
    </div>;
  },
});
