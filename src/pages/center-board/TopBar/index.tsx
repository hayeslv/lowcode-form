import { ElButton, ElMessageBox } from "element-plus";
import { Delete, VideoPlay } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import "./index.scss";
import { useDrawingList } from "../hooks";

export default defineComponent({
  setup() {
    const { drawingListClear } = useDrawingList();
    const handler = {
      empty() {
        ElMessageBox.confirm("确定要清空所有组件吗？", "提示", { type: "warning" })
          .then(() => {
            drawingListClear();
          });
      },
    };

    return { handler };
  },
  render() {
    return <div class="action-bar">
      <ElButton icon={VideoPlay} type="primary" text>运行</ElButton>
      <ElButton icon={Delete} type="danger" text onClick={this.handler.empty}>清空</ElButton>
    </div>;
  },
});
