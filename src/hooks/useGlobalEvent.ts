import { useNodeList, useActiveNode } from "~/hooks";

const { getActiveNode } = useActiveNode();
const { deleteNode } = useNodeList();

export function useGlobalEvent() {
  const keyboard = {
    delete() {
      const node = getActiveNode();
      node && deleteNode(node);
    },
  };

  return { keyboard };
}
