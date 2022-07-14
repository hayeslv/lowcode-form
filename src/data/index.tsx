import type { IBaseNode } from "../lowform-meta/type";

// 加载全部组件
export async function loadComponentMap() {
  const componentMap: Record<string, IBaseNode> = {};

  // 同步加载全部数据文件（路径函数）
  const files = import.meta.glob("./*.tsx");

  const promises: Promise<any>[] = [];
  // files（对象）转promise数组（内部放函数执行）
  for (const key in files) {
    promises.push(files[key]());
  }

  const defaultOrder = 999999;
  const promiseAllRes = (await Promise.all(promises)) // 获取全部文件内容
    .filter(v => v.default.show) // 拿出show为true的内容
    .sort((a, b) => (a.default.order ?? defaultOrder) - (b.default.order ?? defaultOrder)); // 排序

  // 保存全部组件的配置信息
  promiseAllRes.forEach(model => {
    const config: IBaseNode = model.default;
    componentMap[config.key] = config;
  });

  return componentMap;
}
