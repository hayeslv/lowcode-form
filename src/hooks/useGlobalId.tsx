import { getDrawingListMaxId } from "~/utils";

// 使用全局ID
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
