// import { inject, provide } from "vue";
import { useComponentRender } from "~/hooks";
import { createEvent } from "~/plugins";
import type { IComponent } from "~/types";
import { ComponentType } from "~/types";

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
  // 分类
  const componentTypeMap: Record<ComponentType, IComponent[]> = {
    [ComponentType.INPUT]: [],
    [ComponentType.SELECT]: [],
    [ComponentType.LAYOUT]: [],
  };
  // 全部菜单组件的map
  const componentMap: Record<string, IComponent> = {};

  return {
    componentMap,
    componentTypeMap,
    registry: <Model extends Record<string, string> = {}>(
      key: string,
      component: {
        label: string;
        type: ComponentType;
        model?: Model;
        icon: string;
        transiting: boolean;
        isMenuComponent: boolean;
        placeholder?: string;
        layout: "colFormItem" | "rowFormItem";
        __config__: {
          span: number;
          defaultValue: string | number;
        };
        children: IComponent[];
      },
      render: (data: {
        model: { [k in keyof Model]: any };
        custom?: Record<string, any>;
        component: IComponent;
        __vModel__?: string;
      }) => JSX.Element) => {
      const { setComponentRender } = useComponentRender();
      // 函数体
      const comp = { ...component, key };
      componentMap[key] = comp;
      componentTypeMap[component.type].push(comp);

      setComponentRender(key, render);
    },
  };
}
