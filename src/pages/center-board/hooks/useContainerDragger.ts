import type { FormNode } from "~/lowform-meta/instance/Node";
import { useDragging, useNodeList } from "~/hooks";

const { addNode } = useNodeList();
const { getDragging } = useDragging();
const { includeNode } = useNodeList();

export function useContainerDragger() {
  // dragenter：进入元素，添加一个移动的标识
  const dragenter = (e: DragEvent) => {
    e.preventDefault();
    const dragging = getDragging()!;
    if (includeNode(dragging as FormNode)) {
      e.dataTransfer!.dropEffect = "move";
    } else {
      e.dataTransfer!.dropEffect = "copy";
    }
  };

  // dragover：在目标元素经过，必须要阻止默认行为，否则不能触发drop
  const dragover = (e: DragEvent) => {
    e.preventDefault();

    const dragging = getDragging()!;
    if (includeNode(dragging as FormNode)) {
      e.dataTransfer!.dropEffect = "move";
    } else {
      e.dataTransfer!.dropEffect = "copy";
    }
  };

  // dragleave：离开元素的时候，需要增加一个禁用标识
  const dragleave = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = "none";
  };

  // drop：松手的时候
  const drop = (e: DragEvent) => {
    e.preventDefault();
    const dragging = getDragging()!;
    addNode(dragging as FormNode);
  };

  return { dragenter, dragover, dragleave, drop };
}
