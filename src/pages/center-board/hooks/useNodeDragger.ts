import { useDragging, useNodeList } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { getDragging, setDragging } = useDragging();
const { swapNodes } = useNodeList();

export function useNodeDragger() {
  const dragstart = (e: DragEvent, node: FormNode) => {
    setDragging(node);
  };

  const dragend = () => {
    setDragging(null);
  };

  const dragenter = (e: DragEvent, target: FormNode) => {
    e.preventDefault();

    const dragging = getDragging();
    swapNodes(dragging as FormNode, target);
  };

  return { dragstart, dragend, dragenter };
}
