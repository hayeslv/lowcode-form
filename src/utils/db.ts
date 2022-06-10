import { isProxy } from "vue";
import type { ElementComponent } from "~/config";
import { getOriginArray } from "./vue";

// 先使用localStorage存储，之后可能会改为数据库存储
const DRAWING_LIST = "drawing_list";

export function getDrawingList() {
  const str = localStorage.getItem(DRAWING_LIST);
  try {
    if (str) return JSON.parse(str);
  } catch (error) {
    console.error(error);
  }
  return [];
}

export function saveDrawingList(list: ElementComponent[]) {
  if (isProxy(list)) {
    list = getOriginArray(list);
  }
  try {
    localStorage.setItem(DRAWING_LIST, JSON.stringify(list));
  } catch (error) {
    console.error(error);
  }
}

export const useGlobalId = (() => {
  let GLOBAL_ID = 100;
  return () => {
    const getGlobalId = (): number => {
      return ++GLOBAL_ID;
    };
    return { getGlobalId };
  };
})();
