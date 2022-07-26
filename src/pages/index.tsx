import { defineComponent, onMounted, reactive, ref } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import RightBoard from "~/pages/right-board";
import "~/style/layout.scss";
import "~/style/element-reset.scss";
import type { DialogFormType } from "~/types";
import { EIconPreSuf, TopOperateType } from "~/types";
import { useActiveNode, useGlobalEvent } from "~/hooks";
import CodeTypeDialog from "./dialog/CodeTypeDialog";
import { events } from "~/plugins/events";
import { EventName } from "~/config";
import { generateMethods } from "~/plugins/generate";
import Test from "./test";
import IconsDialog from "./dialog/IconsDialog";
import type { FormNode } from "~/lowform-meta/instance/Node";

export default defineComponent({
  setup() {
    const { getActiveNode } = useActiveNode();
    const { keydown } = useGlobalEvent();
    const dialogVisible = reactive({
      codeType: false,
    });
    const iconDialog = reactive<{
      icon: boolean;
      iconType: EIconPreSuf;
      node: FormNode;
    }>({
      icon: false,
      iconType: EIconPreSuf.PrefixIcon,
      node: (getActiveNode()! as FormNode),
    });
    const operateType = ref<TopOperateType>(TopOperateType.Download);

    // 键盘事件
    const keyboardMethods = {
      keydown(e: KeyboardEvent) {
        const { key } = e;
        keydown[key.toLowerCase()] && keydown[key.toLowerCase()]();
      },
    };

    // dialog事件
    const dialogMethods = {
      iconSelect(name: string, iconType: EIconPreSuf) {
        const instance = (iconDialog.node as unknown as FormNode)!.instance;
        if (iconType === EIconPreSuf.PrefixIcon) instance.prefixIcon = name;
        if (iconType === EIconPreSuf.SuffixIcon) instance.suffixIcon = name;
      },
    };

    // 代码生成
    const generate = (data: DialogFormType) => {
      const func = generateMethods[data.operateType];
      func && func(data);
    };

    // 监听下载/复制dialog事件
    events.on(EventName.DownloadDialog, (data: any) => {
      dialogVisible.codeType = data.flag;
      operateType.value = data.type;
    });

    // 监听icon-dialog事件
    events.on(EventName.IconDialog, ({ flag, iconType, node }: any) => {
      iconDialog.icon = flag;
      iconDialog.iconType = iconType;
      iconDialog.node = node;
    });

    onMounted(() => {
      window.addEventListener("keydown", keyboardMethods.keydown);
    });

    return { dialogVisible, operateType, generate, dialogMethods, iconDialog };
  },
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
      <CodeTypeDialog v-model:visible={this.dialogVisible.codeType} operateType={this.operateType} title="选择生成类型" onConfirm={this.generate} />
      <IconsDialog v-model:visible={this.iconDialog.icon} iconType={this.iconDialog.iconType} activeName={this.iconDialog.node ? this.iconDialog.node.instance[this.iconDialog.iconType] as string | undefined : ""} onSelect={this.dialogMethods.iconSelect} />
      {false && <Test />}
    </div>;
  },
});
