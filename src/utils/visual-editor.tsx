// import { inject, provide } from "vue";
import { createEvent } from "~/plugins";
import type { IComponent } from "~/types";

// 虚拟拖拽事件
export interface VisualDragEvent {
  dragstart: {
    on: (cb: () => void) => void;
    off: (cb: () => void) => void;
    emit: () => void;
  };
  dragover: {
    on: (cb: () => void) => void;
    off: (cb: () => void) => void;
    emit: () => void;
  };
  dragend: {
    on: (cb: () => void) => void;
    off: (cb: () => void) => void;
    emit: () => void;
  };
}

// 拖拽事件：开始
export const VisualDragStart = (() => {
  const event = createEvent();
  return {
    on: (fn) => event.on(fn),
    off: (fn) => event.off(fn),
    emit: (...args) => event.emit(...args),
  };
})();
// 拖拽事件：移动
export const VisualDragOver = (() => {
  const event = createEvent();
  return {
    on: (fn) => event.on(fn),
    off: (fn) => event.off(fn),
    emit: () => event.emit(),
  };
})();
// 拖拽事件：结束
export const VisualDragEnd = (() => {
  const event = createEvent();
  return {
    on: (fn) => event.on(fn),
    off: (fn) => event.off(fn),
    emit: () => event.emit(),
  };
})();
// 菜单组件点击
export const VisualComponentClick = (() => {
  const event = createEvent();
  return {
    on: (fn) => event.on(fn),
    off: (fn) => event.off(fn),
    emit: (...args) => event.emit(...args),
  };
})();

// 创建组件配置
export function createComponentsConfig() {
  const componentList: IComponent[] = [];
  const componentMap: Record<string, IComponent> = {};

  return {
    componentList,
    componentMap,
    registry: <
      Model extends Record<string, string> = {},
    >(key: string, component: {
      label: string;
      model?: Model;
      preview: () => JSX.Element;
      render: (data: {
        model: { [k in keyof Model]: any };
        custom: Record<string, any>;
      }) => JSX.Element;
    }) => {
      const comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    },
  };
}
