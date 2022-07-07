type SimplyListener = (...args: any[]) => void;

// 创建单个订阅器
function createEvent() {
  const listeners: SimplyListener[] = [];
  return {
    on: (cb: SimplyListener) => {
      listeners.push(cb);
    },
    off: (cb: SimplyListener) => {
      const index = listeners.indexOf(cb);
      if (index > -1) listeners.splice(index, 1);
    },
    emit: (...args: any[]) => {
      listeners.forEach(fn => fn(...args));
    },
  };
}

// 编辑器内节点发生更新
export const EventNodeListUpdate = createEvent();
