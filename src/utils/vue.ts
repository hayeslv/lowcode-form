import { isProxy, isRef, toRaw, unref } from "vue";
/**
 * Vue相关的函数
 */

// 获取原始数组
export function getOriginArray(arr: any[]) {
  if (isRef(arr) || isProxy(arr)) {
    const array = toRaw(unref(arr)).map(v => getOriginData(v));
    return (array as any[]).slice();
  }
  return arr;
}
// 获取原始数据
export function getOriginData(data) {
  if (isProxy(data)) {
    const newData = toRaw(unref(data));
    return newData;
  }
  return data;
}
