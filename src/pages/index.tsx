import { defineComponent, onMounted } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import { useForm } from "~/config";
import { useDrawingList } from "~/hooks";

export default defineComponent({
  setup() {
    onMounted(() => {
      // 初始化form
      const { getForm } = useForm();
      const { drawingList } = useDrawingList();
      const form = getForm();
      drawingList.value.forEach(v => {
        form[v.__vModel__] = v.__config__.defaultValue;
      });
    });
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
    </div>;
  },
});
