import { defineComponent, onMounted, ref } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import { TopOperateType } from "~/types";
import { useActiveNode } from "~/hooks";

export default defineComponent({
  setup() {
    const { getActiveNode } = useActiveNode();
    const codeTypeVisible = ref(false);
    const operateType = ref<TopOperateType>(TopOperateType.Download);

    const keyboardMethods = {
      keydown(e: KeyboardEvent) {
        const { key } = e;
        if (key === "Delete") {
          const activeNode = getActiveNode();
          activeNode?.remove();
        }
      },
    };

    onMounted(() => {
      window.addEventListener("keydown", keyboardMethods.keydown);
    });

    return { codeTypeVisible, operateType };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
    </div>;
  },
});
