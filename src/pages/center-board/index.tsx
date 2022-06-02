import { ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, ref, toRaw, TransitionGroup } from "vue";
// import DraggableItem from "./DraggableItem";
import { formConfig } from "~/config/component";
import { getOriginArray, removeItem, VisualDragEnd } from "~/utils";
import "./index.scss";
import TopBar from "./TopBar";
// import { VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";

export default defineComponent({
  setup() {
    const drawingList = ref([] as any[]);

    drawingList.value = [
      { name: "john", id: 1, active: false },
      { name: "dylan", id: 2, active: false },
      { name: "jean", id: 3, active: false },
    ];

    const dragging = ref(null as any);

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
      dragend: () => {
        console.log("container end");
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
        dragging.value.active = false;
        dragging.value = null;
      },
      dragenter: (e: DragEvent, item) => {
        e.preventDefault();
        // e.dataTransfer!.effectAllowed = "move";
        // e.dataTransfer!.dropEffect = "move";
        if (!drawingList.value.includes(dragging.value)) {
          // 当前拖拽中的元素是否存在于drawingList中，如果不存在则说明是从左侧菜单拖入的（新增）
          const item = { name: "ahahahhah", id: 4, active: true };
          dragging.value = item;
          drawingList.value.push(item);
        }

        // 获取原始数组
        const nextComponents = getOriginArray(drawingList.value);
        const dst = nextComponents.indexOf(toRaw(item));
        // 删除旧位置上的数据
        removeItem(nextComponents, toRaw(dragging.value));
        // 在新位置（目标元素前面）添加数据
        // insertBeforeItem(nextComponents, dragging.value, item);
        nextComponents.splice(dst, 0, toRaw(dragging.value));

        drawingList.value = nextComponents;
      },
    };

    VisualDragEnd.on(() => {
      dragging.value.active = false;
      dragging.value = null;
    });

    return { drawingList, containerHandler, blockHandler };
  },
  render() {
    return <div class="center-board">
      {/* 顶部操作栏 */}
      <TopBar></TopBar>
      <ElScrollbar class="center-scrollbar">
        <ElRow class="center-board-row" gutter={formConfig.gutter}>
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
                onDrop: () => this.containerHandler.dragend,
              }}
            >
              { this.drawingList.map((item) => (
                <div class={["component", item.active && "sortable-ghost"]}
                  key={item.name}
                  draggable="true"
                  onDragstart={($event) => this.blockHandler.dragstart($event, item)}
                  onDragenter={($event) => this.blockHandler.dragenter($event, item)}
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
