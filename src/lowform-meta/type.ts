export interface BasicNodeData {
  group: string;  // 类型分组
  id?: number;    // 唯一值（实例化后得到）
  transiting: boolean; // 过渡中（过渡中的元素禁止触发“交换位置”的事件）

}

export interface NodeData extends BasicNodeData {

}
