import { CopyDocument, Delete } from "@element-plus/icons-vue";
import { ElCol, ElFormItem, ElIcon, ElRow } from "element-plus";
import type { PropType } from "vue";
import { toRaw, TransitionGroup, defineComponent } from "vue";

import type { ElementComponent } from "~/config";
import { renderComponentMap } from "~/config";
import { useDragging, useDrawingList } from "~/hooks";
import "./index.scss";

const { dragging, setDraggingValue, setDraggingValueAsync } = useDragging();
const {
  drawingListAdd,
  drawingListDelete,
  drawingListExistItem,
  drawingListChangePosition,
} = useDrawingList();

const itemBtns = ({ curComponent, copyItem, deleteItem }) => {
  return [
    <span class="drawing-item-copy" title="复制" onClick={($event) => {
      copyItem(curComponent);
      $event.stopPropagation();
    }}>
      <ElIcon size={14}><CopyDocument /></ElIcon>
    </span>,
    <span class="drawing-item-delete" title="删除" onClick={($event) => {
      deleteItem(curComponent);
      $event.stopPropagation();
    }}>
      <ElIcon size={14}><Delete /></ElIcon>
    </span>,
  ];
};

interface ColFormItemParams {
  activeId?: number;
  curComponent: ElementComponent;
  container?: ElementComponent;
  activeItem: (...args) => void;
  copyItem: (...args) => void;
  deleteItem: (...args) => void;
}
interface RowFormItemParams {
  activeId?: number;
  curComponent: ElementComponent;
  activeItem: (...args) => void;
  copyItem: (...args) => void;
  deleteItem: (...args) => void;
}

let childDragging = false;

const blockHandler = {
  dragstart: (e: DragEvent, item: ElementComponent, container?: ElementComponent) => {
    if (childDragging) return;
    if (container) {
      childDragging = true;
    }
    // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
    setDraggingValueAsync(item);
    console.log("start");
  },
  dragend: () => {
    childDragging = false;
    setDraggingValue(null);
    console.log("end");
  },
  dragenter: (e: DragEvent, item: ElementComponent, container?: ElementComponent) => {
    e.preventDefault();
    if (!dragging.value) return;
    if (item.id === dragging.value?.id) return; // 如果目标是“当前拖动元素”，则直接return
    if (item.transiting) return; // 如果正在进行动画，则直接return

    if (item.type === "layout") {
      // 查看children中是否已经存在了
      if (item.children.some(v => v.id === dragging.value?.id)) return;
      item.children.push(dragging.value);
      drawingListDelete(dragging.value);
      dragging.value = null;
      return;
    }
    if (container) {
      // 在容器内交换位置
      const itemIndex = container.children.findIndex(v => v.id === item.id);
      const draggingIndex = container.children.findIndex(v => v.id === dragging.value!.id);
      [container.children[draggingIndex], container.children[itemIndex]] = [container.children[itemIndex], container.children[draggingIndex]];
      item.transiting = true;
      setTimeout(() => {
        item.transiting = false;
      }, 200);
      return;
    }

    addNewElement();
    // 交换元素位置
    drawingListChangePosition(dragging.value!, toRaw(item));

    item.transiting = true;
    setTimeout(() => {
      item.transiting = false;
    }, 200);
  },
};

// 添加一个新元素
const addNewElement = () => {
  if (!dragging.value) return;
  if (!drawingListExistItem(dragging.value)) {
    // 当前拖拽中的元素是否存在于drawingList中，如果不存在则说明是从左侧菜单拖入的（新增）
    const item = dragging.value;
    setDraggingValue(item);
    drawingListAdd(item);
  }
};

const layouts = {
  colFormItem({ activeId, curComponent, container, activeItem, copyItem, deleteItem }: ColFormItemParams) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol
      class={[
        "drawing-item",
        curComponent.isMenuComponent && "menu-component",
        dragging.value && (curComponent.id === dragging.value?.id) && "sortable-ghost",
        activeId === curComponent.id && "active-from-item",
      ]}
      span={curComponent.__config__.span}
      key={curComponent.id}
      {...{
        draggable: "true",
        onClick: $event => { activeItem(curComponent); $event.stopPropagation();  },
        onDragstart: ($event) => blockHandler.dragstart($event, curComponent, container),
        onDragenter: ($event) => blockHandler.dragenter($event, curComponent, container),
        onDragend: () => blockHandler.dragend(),
      }}>
      { curComponent.isMenuComponent && <svg-icon icon-class={curComponent.icon} /> }
      {
        !curComponent.isMenuComponent &&
        <ElFormItem label-width={labelWidth} label={curComponent.label || ""}>
          {renderComponentMap[curComponent.type] && renderComponentMap[curComponent.type](curComponent)}
        </ElFormItem>
      }
      {itemBtns({ curComponent, copyItem, deleteItem })}
    </ElCol>;
  },
  // 行容器
  // TODO 合并重复项（例如class样式）
  rowFormItem({ activeId, curComponent, activeItem, copyItem, deleteItem }: RowFormItemParams) {
    return <ElCol span={curComponent.__config__.span}>
      <ElRow
        class={[
          "drawing-row-item",
          curComponent.isMenuComponent && "menu-component",
          dragging.value && (curComponent.id === dragging.value?.id) && "sortable-ghost",
          activeId === curComponent.id && "active-from-item",
        ]}
        {...{
          draggable: "true",
          onClick: $event => { activeItem(curComponent); $event.stopPropagation();  },
          onDragstart: ($event) => blockHandler.dragstart($event, curComponent),
          onDragenter: ($event) => blockHandler.dragenter($event, curComponent),
          onDragend: () => blockHandler.dragend(),
        }}>
        <span class="layout-name">{"row" + curComponent.id}</span>
        <TransitionGroup tag="div" name="slide"
          {...{
            class: "drag-wrapper",
          }}
        >
          {curComponent.children.map(c => layouts[c.layout]({ activeId, curComponent: c, container: curComponent, activeItem, copyItem, deleteItem }))}
        </TransitionGroup>
        {itemBtns({ curComponent, copyItem, deleteItem })}
      </ElRow>
    </ElCol>;
  },
};

export default defineComponent({
  props: {
    activeId: { type: Number },
    component: { type: Object as PropType<ElementComponent>, required: true },
    activeItem: { type: Function as PropType<(...args) => void>, required: true  },
    copyItem: { type: Function as PropType<(...args) => void>, required: true },
    deleteItem: { type: Function as PropType<(...args) => void>, required: true },
  },
  setup() {},
  render() {
    const layout = layouts[this.component.layout];
    return layout({
      activeId: this.activeId,
      curComponent: this.component,
      activeItem: this.activeItem,
      copyItem: this.copyItem,
      deleteItem: this.deleteItem,
    });
  },
});
