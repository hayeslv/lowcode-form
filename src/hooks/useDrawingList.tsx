import { ref, toRaw } from "vue";
import type { ElementComponent } from "~/config";
import { getOriginArray } from "~/utils";

const drawingList = ref([] as ElementComponent[]);

export const useDrawingList = () => {
  // 初始化drawingList数据
  const drawingListInit = (list: ElementComponent[]) => {
    drawingList.value = list;
  };

  const getDrawingList = () => {
    return drawingList.value;
  };

  // 添加元素
  const drawingListAdd = (element: ElementComponent, anchor?: ElementComponent) => {
    if (!anchor) {
      drawingList.value.push(toRaw(element));
      return;
    }
    // 获取anchor在drawingList中的位置
    const index = drawingList.value.map(item => item.id).indexOf(anchor.id);
    if (index === -1) return;
    // 在此位置前添加元素
    drawingList.value.splice(index, 0, toRaw(element));
  };

  // 删除元素
  const drawingListDelete = (element: ElementComponent | null) => {
    if (!element) return;
    // 获取入参在drawingList中的位置
    const index = drawingList.value.map(item => item.id).indexOf(element.id);
    if (index === -1) return;
    drawingList.value.splice(index, 1);
  };

  // 交换元素位置
  const drawingListChangePosition = (dragging: ElementComponent, target: ElementComponent) => {
    // 获取原始数组
    const componentList = getOriginArray(drawingList.value);
    // 目标元素位置
    const targetIndex = componentList.map(item => item.id).indexOf(target.id);
    // 拖拽元素位置
    const draggingIndex = componentList.map(item => item.id).indexOf(dragging.id);
    if (targetIndex === -1 || draggingIndex === -1) return;

    // 删除drawingList中的“拖拽中”元素
    componentList.splice(draggingIndex, 1);
    // 在新位置（目标元素前面）添加数据“拖拽中”元素
    componentList.splice(targetIndex, 0, dragging);

    drawingList.value = componentList;
  };

  // 判断drawingList中是否存在某元素
  const drawingListExistItem = (element: ElementComponent | null): boolean => {
    if (!element || !element.id) return false;
    return drawingList.value.some(item => item.id === element.id);
  };

  // 将drawingList中的isMenuComponent归位false
  const resetDrawingListState = () => {
    drawingList.value
      .filter(v => v.isMenuComponent)
      .forEach(v => (v.isMenuComponent = false));
  };

  // 清空drawingList
  const drawingListClear = () => {
    drawingList.value = [];
  };

  return {
    drawingList,
    drawingListInit,
    drawingListAdd,
    drawingListDelete,
    drawingListExistItem,
    drawingListChangePosition,
    resetDrawingListState,
    drawingListClear,
  };
};
