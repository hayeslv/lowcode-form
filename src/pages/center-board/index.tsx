import { ElButton, ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, inject, onMounted, ref } from "vue";
import { VideoPlay } from "@element-plus/icons-vue";
import DraggableItem from "./DraggableItem";
import { formConfig } from "~/config/component";
import "./index.scss";
import { VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";

export default defineComponent({
  setup() {
    const drawingList = ref([]);
    const containerRef = ref({} as any);

    // const handler = {
    //   dragstart: () => {
    //     console.log("dragstart---");
    //   },
    //   dragover: () => {
    //     console.log("drahover---");
    //   },
    //   dragend: () => {
    //     console.log("dragend---");
    //   },
    // };
    // VisualDragStart.on(handler.dragstart);
    // VisualDragOver.on(handler.dragover);
    // VisualDragEnd.on(handler.dragend);

    const containerHandler = {
      // 拖拽菜单组件，进入容器的时候，设置鼠标的可放置状态
      dragenter: (e: DragEvent) => (e.dataTransfer!.dropEffect = "move"),
      // 拖拽菜单组件，鼠标在容器中移动的时候，禁用默认事件
      dragover: (e: DragEvent) => e.preventDefault(),
      // 如果拖拽过程中，鼠标离开了容器，设置鼠标为不可放置的状态
      dragleave: (e: DragEvent) => (e.dataTransfer!.dropEffect = "none"),
      // 在容器中放置的时候，通过事件对象的 offsetX 和 offsetY 添加一条组件数据
      drop: (e: DragEvent) => {
        console.log("drop");
        // const blocks = [...dataModel.value.blocks || []];
        // blocks.push(
        //   createNewBlock({ component: component!, top: e.offsetY, left: e.offsetX }),
        // );
        // methods.updateBlocks(blocks);
        // dragend.emit();
      },
    };

    return () => <div class="center-board">
      <div class="action-bar">
        <ElButton icon={VideoPlay} text>运行</ElButton>
      </div>
      <ElScrollbar class="center-scrollbar">
        <ElRow class="center-board-row"
          gutter={formConfig.gutter}
          ref={containerRef}
          {...{
            onDragenter: containerHandler.dragenter,
            onDragover: containerHandler.dragover,
            onDragleave: containerHandler.dragleave,
            onDrop: containerHandler.drop,
          }}>
          <ElForm
            labelPosition={formConfig.labelPosition}
            disabled={formConfig.disabled}
            labelWidth={formConfig.labelWidth + "px"}
          >
            <div class="drawing-board">
              { drawingList.value.map((element, index) => <DraggableItem key={index} />) }
            </div>
            {!drawingList.value.length && <div class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>}
          </ElForm>
        </ElRow>
      </ElScrollbar>
    </div>;
  },
});
