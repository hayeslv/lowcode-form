import { useDragging } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { setDragging } = useDragging();

export function useNodeDragger() {
  const dragstart = (e: DragEvent, node: FormNode) => {
    setDragging(node);
  };

  const dragend = () => {
    setDragging(null);
  };

  return { dragstart, dragend };
}
