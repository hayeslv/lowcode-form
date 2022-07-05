export function useContainerDragger() {
  // dragenter：进入元素，添加一个移动的标识
  const dragenter = (e: DragEvent) => {
    console.log("enter");
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
  };

  // dragover：在目标元素经过，必须要阻止默认行为，否则不能触发drop
  const dragover = (e: DragEvent) => {
    e.preventDefault();
  };

  // dragleave：离开元素的时候，需要增加一个禁用标识
  const dragleave = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = "none";
  };

  // drop：松手的时候
  const drop = (e: DragEvent) => {
    console.log("drop");
    e.dataTransfer!.dropEffect = "move";
  };

  return { dragenter, dragover, dragleave, drop };
}
