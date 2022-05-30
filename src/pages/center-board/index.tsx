import { ElButton, ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, ref } from "vue";
import { VideoPlay } from "@element-plus/icons-vue";
import DraggableItem from "./DraggableItem";
import { formConfig } from "~/config/component";
import "./index.scss";

export default defineComponent({
  setup() {
    const drawingList = ref([]);

    return { drawingList };
  },
  render() {
    return <div class="center-board">
      <div class="action-bar">
        <ElButton icon={VideoPlay} type="text">运行</ElButton>
      </div>
      <ElScrollbar class="center-scrollbar">
        <ElRow class="center-board-row" gutter={formConfig.gutter}>
          <ElForm
            labelPosition={formConfig.labelPosition}
            disabled={formConfig.disabled}
            labelWidth={formConfig.labelWidth + "px"}
          >
            <div class="drawing-board">
              { this.drawingList.map((element, index) => <DraggableItem key={index} />) }
            </div>
            {!this.drawingList.length && <div class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>}
          </ElForm>
        </ElRow>
      </ElScrollbar>
    </div>;
  },
});
