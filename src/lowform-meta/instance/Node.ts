import { Emiter } from "~/lowform-utils/Emiter";
import type { Topic } from "../Topic";

/**
 * 页面上的一个节点
 */
export class Node extends Emiter<Topic> {
  protected data: Record<string, any>;

  constructor() {
    super();
  }
}
