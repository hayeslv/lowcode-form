import { useGlobalId } from "~/hooks";
import { Emiter } from "~/lowform-utils/Emiter";
import type { Topic } from "../Topic";
import type { IBaseNode, IFormNodeInstance } from "../type";

/**
 * 表单节点
 */
export class FormNode extends Emiter<Topic> {
  protected _data: IFormNodeInstance;

  constructor(data: IBaseNode) {
    super();

    const id = useGlobalId().getGlobalId();
    this._data = {
      ...data,
      id,
      model: `field${id}`,
    };
  }

  get instance() {
    return this._data;
  }
}
