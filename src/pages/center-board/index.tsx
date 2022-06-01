import { ElButton, ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, ref, TransitionGroup } from "vue";
import { VideoPlay } from "@element-plus/icons-vue";
import DraggableItem from "./DraggableItem";
import { VueDraggableNext as Draggable } from "vue-draggable-next";
import { formConfig } from "~/config/component";
import "./index.scss";
// import { VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";

export default defineComponent({
  setup() {
    const drawingList = ref([] as any[]);

    drawingList.value = [
      { name: "john", id: 1 },
      { name: "dylan", id: 2 },
      { name: "jean", id: 3 },
    ];
    // const containerRef = ref({} as any);

    // const containerHandler = {
    //   // 拖拽菜单组件，进入容器的时候，设置鼠标的可放置状态
    //   dragenter: (e: DragEvent) => (e.dataTransfer!.dropEffect = "move"),
    //   // 拖拽菜单组件，鼠标在容器中移动的时候，禁用默认事件
    //   dragover: (e: DragEvent) => e.preventDefault(),
    //   // 如果拖拽过程中，鼠标离开了容器，设置鼠标为不可放置的状态
    //   dragleave: (e: DragEvent) => (e.dataTransfer!.dropEffect = "none"),
    //   // 在容器中放置的时候，通过事件对象的 offsetX 和 offsetY 添加一条组件数据
    //   drop: (e: DragEvent) => {
    //     console.log("drop");
    //   },
    // };

    const logHandler = (event) => {
      console.log(event);
    };

    const dragging = ref(null);
    const handleDragStart = (e, item) => {
      dragging.value = item;
    };
    const handleDragOver = (e, item) => {
      e.dataTransfer.dropEffect = "move";
    };
    const handleDragEnter = (e, item) => {
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = "move";
      if (item === dragging.value) {
        return;
      }
      const newItems = [...drawingList.value];
      const src = newItems.indexOf(dragging.value);

      const dst = newItems.indexOf(item);

      newItems.splice(dst, 0, ...newItems.splice(src, 1));

      drawingList.value = newItems;
    };
    const handleDragEnd = (e, item) => {
      dragging.value = null;
    };

    return () => <div class="center-board">
      <div class="action-bar">
        <ElButton icon={VideoPlay} text>运行</ElButton>
      </div>
      <ElScrollbar class="center-scrollbar">
        <ElRow class="center-board-row"
          gutter={formConfig.gutter}>
          {/* ref={containerRef}
          {...{
            onDragenter: containerHandler.dragenter,
            onDragover: containerHandler.dragover,
            onDragleave: containerHandler.dragleave,
            onDrop: containerHandler.drop,
          }}> */}
          <ElForm
            labelPosition={formConfig.labelPosition}
            disabled={formConfig.disabled}
            labelWidth={formConfig.labelWidth + "px"}
          >
            <TransitionGroup tag="div" name="slide" {...{ class: "container" }}>
              { drawingList.value.map((item) => (
                <div class="item"
                  key={item.name}
                  draggable="true"
                  style="background:#ffebcc; width:80px; height:80px;"
                  onDragstart={($event) => handleDragStart($event, item)}
                  onDragover={($event) => handleDragOver($event, item)}
                  onDragenter={($event) => handleDragEnter($event, item)}
                  onDragend={($event) => handleDragEnd($event, item)}
                >-------{item.name}</div>
              )) }
            </TransitionGroup>
            {!drawingList.value.length && <div class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>}
          </ElForm>
        </ElRow>
      </ElScrollbar>
    </div>;
  },
});
