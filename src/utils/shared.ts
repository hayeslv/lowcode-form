// 删除数组中的某一项，直接修改当前数组
export function removeItem(arr: any[], item) {
  if (!arr.includes(item)) return null;

  const index = arr.indexOf(item);
  arr.splice(index, 1);
  return arr;
}

// 首字母大写
export function titleCase(str: string) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
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

// 复制文本至剪切板
export function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}
