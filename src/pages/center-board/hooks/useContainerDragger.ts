import type { FormNode } from "~/lowform-meta/instance/Node";
import { useDragging, useNodeList } from "~/hooks";

const { addNode } = useNodeList();
const { getDragging } = useDragging();

export function useContainerDragger() {
  // dragenter：进入元素，添加一个移动的标识
  const dragenter = (e: DragEvent) => {
    if (__DEV__) {
      console.log("container dragenter");
    }
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
  };

  // dragover：在目标元素经过，必须要阻止默认行为，否则不能触发drop
  const dragover = (e: DragEvent) => {
    if (__DEV__) {
      console.log("container dragover");
    }
    e.preventDefault();
  };

  // dragleave：离开元素的时候，需要增加一个禁用标识
  const dragleave = (e: DragEvent) => {
    if (__DEV__) {
      console.log("container dragleave");
    }
    e.dataTransfer!.dropEffect = "none";
  };

  // drop：松手的时候
  const drop = (e: DragEvent) => {
    if (__DEV__) {
      console.log("container drop");
    }
    e.dataTransfer!.dropEffect = "move";
    const dragging = getDragging()!;
    addNode(dragging as FormNode);
  };

  return { dragenter, dragover, dragleave, drop };
}
