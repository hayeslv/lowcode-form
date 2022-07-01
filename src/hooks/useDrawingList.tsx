import { ref, toRaw } from "vue";
import type { IComponent } from "~/types";
import { getOriginArray } from "~/utils";

const drawingList = ref([] as IComponent[]);

export const useDrawingList = () => {
  // 初始化drawingList数据
  const drawingListInit = (list: IComponent[]) => {
    drawingList.value = list;
  };

  // 添加元素
  const drawingListAdd = (element: IComponent, anchor?: IComponent) => {
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
  const drawingListDelete = (element: IComponent | null) => {
    if (!element) return;
    // 获取入参在drawingList中的位置
    const index = drawingList.value.map(item => item.id).indexOf(element.id);
    if (index === -1) return;
    drawingList.value.splice(index, 1);
  };

  // 交换元素位置
  const drawingListChangePosition = (dragging: IComponent, target: IComponent) => {
    // 获取原始数组
    const componentList = getOriginArray(drawingList.value);
    // 目标元素位置
    const targetIndex = componentList.map(item => item.id).indexOf(target.id);
    // 拖拽元素位置
    const draggingIndex = componentList.map(item => item.id).indexOf(dragging.id);
    if (targetIndex === -1 || draggingIndex === -1) return;

    // 交换“目标元素”和“当前拖拽元素”的位置
    [componentList[targetIndex], componentList[draggingIndex]] = [componentList[draggingIndex], componentList[targetIndex]];

    drawingList.value = componentList;
  };

  // 判断drawingList中是否存在某元素
  const drawingListExistItem = (element: IComponent | null): boolean => {
    if (!element || !element.id) return false;
    // TODO 使用map维护全部组件
    const childrensItem: IComponent[] = [];
    drawingList.value
      .map(v => toRaw(v.children))
      .forEach(v => v && childrensItem.push(...v));
    return drawingList.value.some(item => item.id === element.id) || childrensItem.some(v => v.id === element.id);
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
