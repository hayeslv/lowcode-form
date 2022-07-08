import { useActiveNode, useDragging, useNodeList } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { getDragging, setDragging, setDraggingAsync } = useDragging();
const { swapNodes, includeNode } = useNodeList();
const { setActiveNode } = useActiveNode();

export function useNodeDragger() {
  const click = (e: MouseEvent, target: FormNode) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveNode(target);
  };

  const dragstart = (e: DragEvent, node: FormNode) => {
    setDraggingAsync(node);
    setActiveNode(node);
  };

  const dragend = () => {
    setDragging(null);
  };

  const dragenter = (e: DragEvent, target: FormNode) => {
    e.preventDefault();

    const dragging = getDragging();
    if (includeNode(dragging as FormNode)) {
      swapNodes(dragging as FormNode, target);
    }
  };

  return { click, dragstart, dragend, dragenter };
}
