/**
 * 菜单相关
 */

import { loadComponents } from "~/config/registerComponent";
import type { IBaseNode } from "~/lowform-meta/type";
import { EComponentTypeName } from "~/lowform-meta/type";

// 获取菜单分组
export const getMenuClassify = async() => {
  // 加载组件
  const files = await loadComponents();
  const models: Record<string, IBaseNode[]> = files.map(v => v.default)
    .reduce((prev, now) => {
      if (!prev[now.group]) prev[now.group] = [] as any[];
      prev[now.group].push(now);
      return prev;
    }, {} as Record<string, IBaseNode[]>);

  console.log(models);
  return models;
};

// 根据分组key获取相应的中文名称
export const getGroupNameByKey = (key: string) => {
  return EComponentTypeName[key];
};
