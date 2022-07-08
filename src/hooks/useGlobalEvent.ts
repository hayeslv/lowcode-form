import { useNodeList, useActiveNode } from "~/hooks";
import type { FormNode } from "~/lowform-meta/instance/Node";

const { getActiveNode } = useActiveNode();
const { deleteNode } = useNodeList();

export function useGlobalEvent() {
  const keydown = {
    delete() {
      const node = getActiveNode();
      node && deleteNode(node as FormNode);
    },
  };

  return { keydown };
}
