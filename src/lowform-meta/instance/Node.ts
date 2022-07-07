import { useGlobalId } from "~/hooks";
import { Emiter } from "~/lowform-utils/Emiter";
import type { Topic } from "../Topic";
import type { IBaseNode, IFormNodeInstance } from "../type";

/**
 * 表单节点
 */
export class FormNode extends Emiter<Topic> {
  protected _data: IFormNodeInstance;
  public transiting: boolean;

  constructor(data: IBaseNode | IFormNodeInstance) {
    super();
    if (typeof (data as IFormNodeInstance).id === "undefined") {
      // id为undefined，说明是IBaseNode类型
      const id = useGlobalId().getGlobalId();
      this._data = {
        ...data,
        id,
        model: `field${id}`,
      };
    } else {
      this._data = data as IFormNodeInstance;
    }
  }

  get instance() {
    return this._data;
  }

  renter() {
    return this._data.render();
  }

  getJson() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { render, ...json } = this._data;
    return json;
  }
}
