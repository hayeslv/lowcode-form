import { defineComponent, onMounted, ref } from "vue";
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

export default defineComponent({
  setup() {
    const { keydown } = useGlobalEvent();
    const codeTypeVisible = ref(false);
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
      codeTypeVisible.value = data.flag;
      operateType.value = data.type;
    });

    onMounted(() => {
      window.addEventListener("keydown", keyboardMethods.keydown);
    });

    return { codeTypeVisible, operateType, generate };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
      <CodeTypeDialog v-model:visible={this.codeTypeVisible} operateType={this.operateType} title="选择生成类型" onConfirm={this.generate} />
      {false && <Test />}
    </div>;
  },
});
