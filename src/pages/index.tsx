import { defineComponent, onMounted, ref } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import { EventName, GlobelItem, useDrawingList, useForm, useGlobalEvent, useGlobalObject } from "~/hooks";
import CodeTypeDialog from "~/pages/dialog/CodeTypeDialog";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import { generateMethods, loadBeautifier } from "~/plugins";
import type { DialogFormType } from "~/types";

export default defineComponent({
  setup() {
    const { setGlobalItem } = useGlobalObject();

    const codeTypeVisible = ref(false);
    const codeTypeVisibleEvent = useGlobalEvent(EventName.DOWNLOAD_VUE_FILE_SHOW_DIALOG);
    codeTypeVisibleEvent.on((flag: boolean) => { codeTypeVisible.value = flag; });

    const generate = (data: DialogFormType) => {
      const func = generateMethods[data.type];
      func && func(data);
    };

    onMounted(() => {
      // 初始化form
      const { getForm } = useForm();
      const { drawingList } = useDrawingList();
      const form = getForm();
      drawingList.value.forEach(v => {
        form[v.__vModel__] = v.__config__.defaultValue;
      });

      loadBeautifier(btf => {
        setGlobalItem(GlobelItem.beautifier, btf);
      });
    });

    return { codeTypeVisible, generate };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
      <CodeTypeDialog v-model:visible={this.codeTypeVisible} title="选择生成类型" onConfirm={this.generate} />
    </div>;
  },
});
