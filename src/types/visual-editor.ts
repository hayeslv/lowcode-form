// 组件
export interface IComponent {
  key: string;                    // 组件key，例如：text、input、button等
  label: string;                  // 中文释义
  model?: Record<string, string>; // 绑定字段：可能没有，也可能有多个（如日期区间）
  preview: () => JSX.Element;
  render: (data: {                // 渲染函数
    model: any;                   // 绑定字段
    custom: Record<string, any>;  // 用户自定义字段
  }) => JSX.Element;
}
