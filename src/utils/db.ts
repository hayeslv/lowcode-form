import { isProxy } from "vue";
import type { ElementComponent } from "~/config";
import { getOriginArray } from "./vue";

// 先使用localStorage存储，之后可能会改为数据库存储
const DRAWING_LIST = "drawing_list";

export function getDrawingList(): ElementComponent[] {
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
// 获取全局DrawingList的最大id
export const getDrawingListMaxId = () => {
  const list = getDrawingList();
  if (list.length === 0) return 0;
  return Math.max(...list.map(v => v.id || 0));
};

export const useGlobalId = (() => {
  const maxId = getDrawingListMaxId();
  let GLOBAL_ID = maxId || 100;
  return () => {
    const getGlobalId = (): number => {
      return ++GLOBAL_ID;
    };
    return { getGlobalId };
  };
})();
