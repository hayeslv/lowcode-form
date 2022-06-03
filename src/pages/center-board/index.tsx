import { ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, toRaw, TransitionGroup } from "vue";
// import DraggableItem from "./DraggableItem";
import { formConfig } from "~/config/component";
import { getOriginArray, removeItem, VisualDragEnd, VisualDragStart } from "~/utils";
import { useDragging, useDrawingList } from "./hooks";
import "./index.scss";
import TopBar from "./TopBar";

export default defineComponent({
  setup() {
    // 画布中的元素列表
    const { drawingList, drawingListAdd } = useDrawingList();
    // 当前正在拖拽的元素
    const { dragging, setDraggingValue } = useDragging();

    const containerHandler = {
      dragover: (e: DragEvent) => { // 拖拽组件，组件在容器中移动的时候
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
      },
      dragenter: (e: DragEvent) => {
        // 拖拽组件，组件刚进入容器的时候
        // 从另一个组件上出来，进入容器上方的时候，也会触发
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
        if (!drawingList.value.some(item => item.id === dragging.value.id)) {
          const item = { name: "ahahahhah", id: Math.floor(Math.random() * 9999) };
          setDraggingValue(item);
          drawingListAdd(item);
        }
      },
    };

    const blockHandler = {
      dragstart: (e: DragEvent, item) => {
        setTimeout(() => { // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
          setDraggingValue(item);
        });
      },
      dragend: () => {
        setDraggingValue(null);
      },
      dragenter: (e: DragEvent, item) => {
        e.preventDefault();
        // e.dataTransfer!.effectAllowed = "move";
        // e.dataTransfer!.dropEffect = "move";
        if (!drawingList.value.some(item => item.id === dragging.value.id)) {
          // 当前拖拽中的元素是否存在于drawingList中，如果不存在则说明是从左侧菜单拖入的（新增）
          const item = { name: "ahahahhah", id: Math.floor(Math.random() * 9999) };
          setDraggingValue(item);
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

    VisualDragStart.on((element) => {
      setDraggingValue(element);
    });
    VisualDragEnd.on(() => {
      setDraggingValue(null);
    });

    return { dragging, drawingList, containerHandler, blockHandler };
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
              }}
            >
              { this.drawingList.map((item) => (
                <div class={["component", this.dragging && (item.id === this.dragging.id) && "sortable-ghost"]}
                  key={item.name}
                  draggable="true"
                  onDragstart={($event) => this.blockHandler.dragstart($event, item)}
                  onDragenter={($event) => this.blockHandler.dragenter($event, item)}
                  onDragend={() => this.blockHandler.dragend()}
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
