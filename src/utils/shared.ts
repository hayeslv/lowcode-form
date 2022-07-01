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
  // return navigator.clipboard.writeText(text);

  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    return navigator.clipboard.writeText(text);
  } else {
    // TODO 后退方式，还没解决
    // 创建text area
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? resolve(true) : reject(new Error());
      textArea.remove();
    });
  }
}
