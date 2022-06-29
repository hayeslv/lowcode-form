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
import { TopOperateType } from "~/types";

export default defineComponent({
  setup() {
    const { setGlobalItem } = useGlobalObject();

    const codeTypeVisible = ref(false);
    const operateType = ref<TopOperateType>(TopOperateType.Download);

    const codeTypeVisibleEvent = useGlobalEvent(EventName.DOWNLOAD_VUE_FILE_SHOW_DIALOG);
    codeTypeVisibleEvent.on((flag: boolean, type: TopOperateType) => {
      codeTypeVisible.value = flag;
      operateType.value = type;
    });

    const generate = (data: DialogFormType) => {
      const func = generateMethods[data.operateType];
      func && func(data);
    };

    onMounted(() => {
      // 初始化form
      const { getForm } = useForm();
      const { drawingList } = useDrawingList();
      const form = getForm();
      drawingList.value.forEach(v => {
        form[v.__vModel__!] = v.__config__.defaultValue;
      });

      loadBeautifier(btf => {
        setGlobalItem(GlobelItem.beautifier, btf);
      });
    });

    return { codeTypeVisible, operateType, generate };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
      <CodeTypeDialog v-model:visible={this.codeTypeVisible} operateType={this.operateType} title="选择生成类型" onConfirm={this.generate} />
    </div>;
  },
});
