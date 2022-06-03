// 删除数组中的某一项，直接修改当前数组
export function removeItem(arr: any[], item) {
  if (!arr.includes(item)) return null;

  const index = arr.indexOf(item);
  arr.splice(index, 1);
  console.log(arr);
  return arr;
}
