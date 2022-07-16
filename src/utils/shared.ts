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

// 首字母大写
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
