const callbacks = {};

/**
 * 加载一个远程脚本
 * @param {string} src 远程脚本地址
 * @param {Function} callback 回调函数
 */
function loadScript(src: string, callback: Function) {
  const existingScript = document.getElementById(src);
  const cb = callback || (() => {});
  if (!existingScript) {
    callbacks[src] = [];
    const $script = document.createElement("script");
    $script.src = src;
    $script.id = src;
    $script.async = true;
    document.body.append($script);
    // 兼容IE
    const onEnd = "onload" in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script);
    onEnd($script);
  }

  callbacks[src].push(cb);

  function stdOnEnd(script) {
    script.onload = () => {
      // @ts-ignore
      this.onerror = this.onload = null;
      callbacks[src].forEach(item => {
        item(null, script);
      });
      delete callbacks[src];
    };
    script.onerror = () => {
      // @ts-ignore
      this.onerror = this.onload = null;
      cb(new Error(`Failed to load ${src}`, script));
    };
  }

  function ieOnEnd(script) {
    script.onreadystatechange = () => {
      // @ts-ignore
      if (this.readyState !== "complete" && this.readyState !== "loaded") return;
      // @ts-ignore
      this.onreadystatechange = null;
      callbacks[src].forEach(item => {
        item(null, script);
      });
      delete callbacks[src];
    };
  }
}

export default loadScript;
