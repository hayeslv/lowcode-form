export class Emiter<Topic extends number> {
  // 观察器：一个Map对象，key为字符串，value为回调函数数组。
  // 例如：{ 0: [ ()=> {console.log("组件发生了拖拽")}, () =>{console.log("组件拖拽开始了")} ] }
  private observers: Array<Array<Function>>;
  constructor() {
    // 预设50个枚举
    this.observers = new Array(50);
  }

  addObserver(topic: Topic, observer: Function) {
    if (!this.observers[topic]) {
      this.observers[topic] = [];
    }
    this.observers[topic].push(observer);
  }

  removeObserver(topic: Topic, observer: Function) {
    const list = this.observers[topic];
    if (list && list.length > 0) {
      this.observers[topic] = list.filter(v => v !== observer);
    }
  }

  on(topic: Topic | Topic[], observer: Function) {
    if (Array.isArray(topic)) {
      topic.forEach(t => this.addObserver(t, observer));
    } else {
      this.addObserver(topic, observer);
    }
  }

  emit(topic: Topic, data?: any) {
    if (this.observers[topic]) {
      this.observers[topic].forEach(observer => observer(data));
    }
  }
}
