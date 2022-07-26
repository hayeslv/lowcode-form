import { defineComponent, onMounted, reactive, ref } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import type { DialogFormType } from "~/types";
import { TopOperateType } from "~/types";
import { useGlobalEvent } from "~/hooks";
import CodeTypeDialog from "./dialog/CodeTypeDialog";
import { events } from "~/plugins/events";
import { EventName } from "~/config";
import { generateMethods } from "~/plugins/generate";
import Test from "./test";
import IconsDialog from "./dialog/IconsDialog";

export default defineComponent({
  setup() {
    const { keydown } = useGlobalEvent();
    const dialogVisible = reactive({
      codeType: false,
      icon: false,
    });
    const operateType = ref<TopOperateType>(TopOperateType.Download);

    const keyboardMethods = {
      keydown(e: KeyboardEvent) {
        const { key } = e;
        keydown[key.toLowerCase()] && keydown[key.toLowerCase()]();
      },
    };

    const generate = (data: DialogFormType) => {
      const func = generateMethods[data.operateType];
      func && func(data);
    };

    // 监听下载/复制dialog事件
    events.on(EventName.DownloadDialog, (data: any) => {
      dialogVisible.codeType = data.flag;
      operateType.value = data.type;
    });

    events.on(EventName.IconDialog, ({ flag }: any) => {
      dialogVisible.icon = flag;
    });

    onMounted(() => {
      window.addEventListener("keydown", keyboardMethods.keydown);
    });

    return { dialogVisible, operateType, generate };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
      <CodeTypeDialog v-model:visible={this.dialogVisible.codeType} operateType={this.operateType} title="选择生成类型" onConfirm={this.generate} />
      <IconsDialog v-model:visible={this.dialogVisible.icon} />
      {false && <Test />}
    </div>;
  },
});
