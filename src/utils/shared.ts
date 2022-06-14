// 删除数组中的某一项，直接修改当前数组
export function removeItem(arr: any[], item) {
  if (!arr.includes(item)) return null;

  const index = arr.indexOf(item);
  arr.splice(index, 1);
  return arr;
}

export function isBoolean(value): boolean {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}
export function isString(value): boolean {
  return Object.prototype.toString.call(value) === "[object String]";
}
export function isNumber(value): boolean {
  return Object.prototype.toString.call(value) === "[object Number]";
}
export function isArray(value): boolean {
  return Array.isArray(value);
}
