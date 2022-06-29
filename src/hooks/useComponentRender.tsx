// 组件对应的render函数
const componentRender: Record<string, (...args) => JSX.Element> = {};

export const useComponentRender = () => {
  const getComponentRender = (key: string) => {
    return componentRender[key];
  };
  const setComponentRender = (key: string, fn: (...args) => JSX.Element) => {
    componentRender[key] = fn;
  };

  return { getComponentRender, setComponentRender };
};
