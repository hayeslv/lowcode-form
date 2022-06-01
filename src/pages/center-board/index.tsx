import { ElButton, ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, ref, TransitionGroup } from "vue";
import { VideoPlay } from "@element-plus/icons-vue";
import DraggableItem from "./DraggableItem";
import { formConfig } from "~/config/component";
import "./index.scss";
import { addClass, removeClass } from "~/utils";
// import { VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";

export default defineComponent({
  setup() {
    const drawingList = ref([] as any[]);

    drawingList.value = [
      { name: "john", id: 1, active: false },
      { name: "dylan", id: 2, active: false },
      { name: "jean", id: 3, active: false },
    ];

    const dragging = ref(null);

    const containerHandler = {
      // 拖拽组件，鼠标在容器中移动的时候
      dragover: (e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
      },
      dragenter: (e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
      },
    };

    const blockHandler = {
      dragstart: (e: DragEvent, item) => {
        setTimeout(() => { // 异步对当前元素进行激活（active），可以让浏览器复制出来的ghost不带横线
          item.active = true;
          dragging.value = item;
        });
      },
      dragend: (e: DragEvent, item) => {
        dragging.value = null;
        item.active = false;
      },
      dragenter: (e: DragEvent, item) => {
        e.preventDefault();
        e.dataTransfer!.effectAllowed = "move";
        e.dataTransfer!.dropEffect = "move";
        if (item === dragging.value) {
          return;
        }
        const newItems = [...drawingList.value];
        const src = newItems.indexOf(dragging.value);

        const dst = newItems.indexOf(item);

        newItems.splice(dst, 0, ...newItems.splice(src, 1));

        drawingList.value = newItems;
      },
      dragleave: (e: DragEvent) => {
        // removeClass((e.target as HTMLElement), "sortable-ghost");
      },
    };

    return { drawingList, containerHandler, blockHandler };
  },
  render() {
    return <div class="center-board">
      <div class="action-bar">
        <ElButton icon={VideoPlay} text>运行</ElButton>
      </div>
      <ElScrollbar class="center-scrollbar">
        <ElRow class="center-board-row"
          gutter={formConfig.gutter}>
          <ElForm
            labelPosition={formConfig.labelPosition}
            disabled={formConfig.disabled}
            labelWidth={formConfig.labelWidth + "px"}
          >
            <TransitionGroup tag="div" name="slide"
              {...{
                class: "drawing-board",
                onDragover: ($event) => this.containerHandler.dragover($event),
                onDragenter: ($event) => this.containerHandler.dragenter($event),
              }}
            >
              { this.drawingList.map((item) => (
                <div class={["component", item.active && "sortable-ghost"]}
                  key={item.name}
                  draggable="true"
                  onDragstart={($event) => this.blockHandler.dragstart($event, item)}
                  onDragenter={($event) => this.blockHandler.dragenter($event, item)}
                  onDragleave={($event) => this.blockHandler.dragleave($event)}
                  onDragend={($event) => this.blockHandler.dragend($event, item)}
                >
                  {item.name}</div>
              )) }
            </TransitionGroup>
            {!this.drawingList.length && <div class="empty-info">
            从左侧拖入或点选组件进行表单设计
            </div>}
          </ElForm>
        </ElRow>
      </ElScrollbar>
    </div>;
  },
});
