/**
 * 菜单相关
 */

import type { IBaseNode } from "~/lowform-meta/type";
import { EComponentTypeName } from "~/lowform-meta/type";

// 获取菜单分组
export const getMenuClassify = (config?: Record<string, IBaseNode>): Record<string, IBaseNode[]> => {
  if (!config) return {};

  const models: Record<string, IBaseNode[]> = Object.values(config)
    .reduce((prev, now) => {
      // 如果没有这个分组，则新建分组
      if (!prev[now.group]) prev[now.group] = [] as any[];
      prev[now.group].push(now);
      return prev;
    }, {} as Record<string, IBaseNode[]>);

  return models;
};

// 根据分组key获取相应的中文名称
export const getGroupNameByKey = (key: string) => {
  return EComponentTypeName[key];
};
