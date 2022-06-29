
import { useForm, useGlobalId } from "~/hooks";
import type { IComponent } from "~/types";

/**
 * 左侧菜单组件实例化
 *
 * @export
 * @param {IComponent} element 待实例化的组件
 * @param {boolean} [force] 是否强制执行
 * @returns {IComponent}
 */
export function menuComponentInstance(element: IComponent, force?: boolean): IComponent {
  // 已经实例化过了（有id），并且不是强制执行
  if (element.id && !force) return element;
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
}
