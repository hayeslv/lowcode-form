
// 加载全部组件
export const loadComponents = async() => {
  // 同步加载全部数据文件（路径函数）
  const files = import.meta.glob("./data/*.ts");

  const promises: Promise<any>[] = [];
  // files（对象）转promise数组（内部放函数执行）
  for (const key in files) {
    promises.push(files[key]());
  }
  const promiseAllRes = await Promise.all(promises);

  return promiseAllRes;
};
