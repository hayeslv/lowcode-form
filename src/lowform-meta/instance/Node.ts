import { useGlobalId, useNodeList } from "~/hooks";
import { Emiter } from "~/lowform-utils/Emiter";
import type { Topic } from "../Topic";
import type { IBaseNode, IFormNodeInstance, IFormSelectNodeInstance, IFormTimeNodeInstance, ISelectNode, ITimeNode } from "../type";

const { getGlobalId } = useGlobalId();
const { deleteNode } = useNodeList();

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

  render(...args: any[]) {
    return this._data.render(...args);
  }

  getJson() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { render, ...json } = this._data;
    return json;
  }

  updateId() {
    this._data.id = getGlobalId();
  }

  // 从nodelist中删除自身
  remove() {
    deleteNode(this);
  }
}

export class FormSelectNode extends FormNode {
  protected _data: IFormSelectNodeInstance;
  constructor(data: ISelectNode | IFormSelectNodeInstance) {
    super(data);
    if (typeof (data as IFormSelectNodeInstance).id === "undefined") {
      // id为undefined，说明是IBaseNode类型
      const id = useGlobalId().getGlobalId();
      this._data = {
        ...data,
        id,
        model: `field${id}`,
      };
    } else {
      this._data = data as IFormSelectNodeInstance;
    }
  }

  get instance() {
    return this._data;
  }
}

export class FormTimeNode extends FormNode {
  protected _data: IFormTimeNodeInstance;
  constructor(data: ITimeNode | IFormTimeNodeInstance) {
    super(data);
    if (typeof (data as IFormTimeNodeInstance).id === "undefined") {
      // id为undefined，说明是IBaseNode类型
      const id = useGlobalId().getGlobalId();
      this._data = {
        ...data,
        id,
        model: `field${id}`,
      };
    } else {
      this._data = data as IFormTimeNodeInstance;
    }
  }

  get instance() {
    return this._data;
  }
}
