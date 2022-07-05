import { defineComponent, onMounted, ref } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import { TopOperateType } from "~/types";
import Test from "./Test";

export default defineComponent({
  setup() {
    const codeTypeVisible = ref(false);
    const operateType = ref<TopOperateType>(TopOperateType.Download);

    onMounted(() => {
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
