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
export async function copyText(text: string) {
  // for ie
  if ((window as any).clipboardData) {
    (window as any).clipboardData.clearData();
    (window as any).clipboardData.setData("text", text);
    return new Promise((resolve) => resolve(true));
  }
  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // 向剪贴板写文本
    return navigator.clipboard.writeText(text);
  }
  // 其他现代浏览器
  if (window.getSelection) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    const range = document.createRange();
    range.selectNode(textArea);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
    document.execCommand("copy");
    return new Promise((resolve) => resolve(true));
  }

  return new Promise((resolve, reject) => reject(new Error("复制失败")));
}
