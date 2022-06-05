// import { inject, provide } from "vue";
import { createEvent } from "~/plugins";

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
