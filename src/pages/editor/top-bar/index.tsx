import { ElButton, ElMessageBox } from "element-plus";
import { Delete, DocumentCopy, Download, View } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import { useNodeList } from "~/hooks";
import { events } from "~/plugins/events";
import { EventName } from "~/config";
import { TopOperateType } from "~/types";
import logo from "~/assets/logo.png";
import github from "~/icons/github.svg";
import "./index.scss";

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
        events.emit(EventName.DownloadDialog, { flag: true, type: TopOperateType.Download });
      },
      copy() {
        events.emit(EventName.DownloadDialog, { flag: true, type: TopOperateType.Copy });
      },
      showJson() {
        events.emit(EventName.JsonDrawer, { flag: true });
      },
    };

    return { handler };
  },
  render() {
    return <div class="top-bar">
      <div class="logo-wrapper">
        <div class="logo">
          <img src={logo} alt="logo" /> Lowcode Form
          <a class="github" href="https://github.com/hayeslv/lowcode-form" target="_blank">
            <img src={github} alt="github" />
          </a>
        </div>
      </div>
      <div class="action-bar">
        <ElButton icon={View} type="primary" onClick={this.handler.showJson}>预览</ElButton>
        <ElButton icon={Download} type="primary" onClick={this.handler.download}>导出</ElButton>
        <ElButton icon={DocumentCopy} type="primary" onClick={this.handler.copy}>复制代码</ElButton>
        <ElButton icon={Delete} type="danger" onClick={this.handler.empty}>清空</ElButton>
      </div>
      <div class="right-bar">

      </div>
    </div>;
  },
});
