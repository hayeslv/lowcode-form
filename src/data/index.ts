import type { IBaseNode } from "./../lowform-meta/type";

export const componentMap: Record<string, IBaseNode> = {};

// 加载全部组件
(async function() {
  // 同步加载全部数据文件（路径函数）
  const files = import.meta.glob("./*.ts");

  const promises: Promise<any>[] = [];
  // files（对象）转promise数组（内部放函数执行）
  for (const key in files) {
    promises.push(files[key]());
  }
  const promiseAllRes = await Promise.all(promises);

  // 保存全部组件的配置信息
  promiseAllRes.forEach(model => {
    const config: IBaseNode = model.default;
    componentMap[config.key] = config;
  });

  return promiseAllRes;
})();
