type SimplyListener = (...args) => void;

export function createEvent() {
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
