import { useDragging } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { setDragging } = useDragging();

export function useNodeDragger() {
  const dragstart = (e: DragEvent, node: FormNode) => {
    if (__DEV__) {
      console.log("node dragstart");
    }
    // e.dataTransfer!.effectAllowed = "move";
    setDragging(node);
  };

  return { dragstart };
}
