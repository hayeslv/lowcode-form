import { ElForm, ElRow, ElScrollbar } from "element-plus";
import { defineComponent, toRaw, TransitionGroup } from "vue";
import DraggableItem from "./DraggableItem";
import type { ElementComponent, MenuComponent } from "~/config/component";
import { formConfig, menuComponentInstance } from "~/config/component";
import { VisualComponentClick, VisualDragEnd, VisualDragStart } from "~/utils";
import { useDragging, useDrawingList } from "./hooks";
import "./index.scss";
import TopBar from "./TopBar";

export default defineComponent({
  setup() {
    // 画布中的元素列表
    const { drawingList, drawingListAdd, drawingListExistItem, drawingListChangePosition, resetDrawingListState } = useDrawingList();
    // 当前正在拖拽的元素
    const { dragging, setDraggingValue, setDraggingValueAsync } = useDragging();

    // 添加一个新元素
    const addNewElement = () => {
      if (!dragging.value) return;
      if (!drawingListExistItem(dragging.value)) {
        // 当前拖拽中的元素是否存在于drawingList中，如果不存在则说明是从左侧菜单拖入的（新增）
        // const item = getRandomData();
        const item = dragging.value;
        setDraggingValue(item);
        drawingListAdd(item);
      }
    };

    const containerHandler = {
      dragover: (e: DragEvent) => { // 拖拽组件，组件在容器中移动的时候
        console.log("container dragover");
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
        // e.dataTransfer!.effectAllowed = "move";
      },
      dragenter: (e: DragEvent) => {
        // 拖拽组件，组件刚进入容器的时候
        // 从另一个组件上出来，进入容器上方的时候，也会触发
        e.preventDefault();
        e.dataTransfer!.dropEffect = "move";
        addNewElement();
      },
    };

    const blockHandler = {
      dragstart: (e: DragEvent, item) => {
        // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
        setDraggingValueAsync(item);
      },
      dragend: () => {
        setDraggingValue(null);
      },
      dragenter: (e: DragEvent, item: ElementComponent) => {
        if (item.transiting) return;
        e.preventDefault();
        // e.dataTransfer!.effectAllowed = "move";
        // e.dataTransfer!.dropEffect = "move";
        addNewElement();
        // 交换元素位置
        drawingListChangePosition(dragging.value!, toRaw(item));

        item.transiting = true;
        setTimeout(() => {
          item.transiting = false;
        }, 200);
      },
    };

    VisualDragStart.on((menuComp: MenuComponent) => {
      const component = menuComponentInstance(menuComp);
      setDraggingValue(component);
    });
    VisualDragEnd.on(() => {
      resetDrawingListState();
      setDraggingValue(null);
    });
    VisualComponentClick.on((menuComp: MenuComponent) => {
      const component = menuComponentInstance(menuComp);
      drawingListAdd(component);
      resetDrawingListState();
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
              { this.drawingList.map((component) => (
                <div class={[
                  component.isMenuComponent && "menu-component",
                  this.dragging && (component.id === this.dragging.id) && "sortable-ghost",
                ]}
                key={component.id}
                draggable="true"
                onDragstart={($event) => this.blockHandler.dragstart($event, component)}
                onDragenter={($event) => this.blockHandler.dragenter($event, component)}
                onDragend={() => this.blockHandler.dragend()}
                >
                  <DraggableItem component={component}></DraggableItem>
                </div>
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
