
import { useForm, useGlobalId } from "~/hooks";
import type { IComponent } from "~/types";

// 左侧菜单组件实例化
export const menuComponentInstance = (() => {
  return (element: IComponent): IComponent => {
    // 已经实例化过了（有id）
    if (element.id) return element;
    const { getGlobalId } = useGlobalId();
    const { setFormValue } = useForm();
    const id = getGlobalId(); // 组件id
    const key = `field${id}`; // 组件绑定的key
    setFormValue(key);

    return {
      ...element,
      id: id,
      __vModel__: key,
    };
  };
})();
