import { ElButton, ElMessageBox } from "element-plus";
import { Delete, Download, VideoPlay } from "@element-plus/icons-vue";
import { defineComponent, ref } from "vue";
import { useDrawingList } from "~/hooks";
import "./index.scss";
import CodeTypeDialog from "~/pages/dialog/CodeTypeDialog";

export default defineComponent({
  setup() {
    const visible = ref(false);

    const { drawingListClear } = useDrawingList();
    const handler = {
      empty() {
        ElMessageBox.confirm("确定要清空所有组件吗？", "提示", { type: "warning" })
          .then(() => {
            drawingListClear();
          });
      },
      download() {
        visible.value = true;
      },
    };

    return { visible, handler };
  },
  render() {
    return <div class="action-bar">
      <ElButton icon={VideoPlay} type="primary" text>运行</ElButton>
      <ElButton icon={Download} type="primary" text onClick={this.handler.download}>导出vue文件</ElButton>
      <ElButton icon={Delete} type="danger" text onClick={this.handler.empty}>清空</ElButton>

      <CodeTypeDialog v-model:visible={this.visible} title="选择生成类型"/>
    </div>;
  },
});
