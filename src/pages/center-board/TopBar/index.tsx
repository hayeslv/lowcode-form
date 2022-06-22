import { ElButton, ElMessageBox } from "element-plus";
import { Delete, Download } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import { EventName, useDrawingList, useGlobalEvent } from "~/hooks";
import "./index.scss";
import { TopOperateType } from "~/types";

export default defineComponent({
  setup() {
    // const visible = ref(false);

    const { drawingListClear } = useDrawingList();
    const handler = {
      empty() {
        ElMessageBox.confirm("确定要清空所有组件吗？", "提示", { type: "warning" })
          .then(() => {
            drawingListClear();
          });
      },
      download() {
        // visible.value = true;
        const event = useGlobalEvent(EventName.DOWNLOAD_VUE_FILE_SHOW_DIALOG);
        event.emit(true, TopOperateType.Download);
      },
    };

    return { handler };
  },
  render() {
    return <div class="action-bar">
      {/* <ElButton icon={VideoPlay} type="primary" text>运行</ElButton> */}
      <ElButton icon={Download} type="primary" text onClick={this.handler.download}>导出vue文件</ElButton>
      <ElButton icon={Delete} type="danger" text onClick={this.handler.empty}>清空</ElButton>
    </div>;
  },
});
