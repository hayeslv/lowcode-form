import { ElButton, ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import "./index.scss";
import { useNodeList } from "~/hooks";

export default defineComponent({
  setup() {
    const { clearNodeList } = useNodeList();

    const handler = {
      empty() {
        ElMessageBox.confirm("确定要清空所有组件吗？", "提示", { type: "warning" })
          .then(() => {
            clearNodeList();
          });
      },
      download() {
        // visible.value = true;
        // const event = useGlobalEvent(EventName.DOWNLOAD_VUE_FILE_SHOW_DIALOG);
        // event.emit(true, TopOperateType.Download);
      },
      copy() {
        // const event = useGlobalEvent(EventName.DOWNLOAD_VUE_FILE_SHOW_DIALOG);
        // event.emit(true, TopOperateType.Copy);
      },
    };

    return { handler };
  },
  render() {
    return <div class="action-bar">
      {/* <ElButton icon={Download} type="primary" text onClick={this.handler.download}>导出vue文件</ElButton>
      <ElButton icon={DocumentCopy} type="primary" text onClick={this.handler.copy}>复制代码</ElButton> */}
      <ElButton icon={Delete} type="danger" text onClick={this.handler.empty}>清空</ElButton>
    </div>;
  },
});
