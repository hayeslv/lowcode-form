import { CopyDocument, Delete } from "@element-plus/icons-vue";
import { ElCol, ElFormItem, ElIcon, ElRow } from "element-plus";
import type { PropType } from "vue";
import { TransitionGroup, defineComponent } from "vue";

import type { ElementComponent } from "~/config";
import { renderComponentMap } from "~/config";
import { useDragging, useDrawingList } from "~/hooks";
import "./index.scss";

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

const layouts = {
  colFormItem({ activeId, curComponent, activeItem, copyItem, deleteItem }: ColFormItemParams) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol class={["drawing-item", activeId === curComponent.id && "active-from-item"]}
      span={curComponent.__config__.span}
      {...{
        onClick: $event => { activeItem(curComponent); $event.stopPropagation();  },
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
  rowFormItem({ activeId, curComponent, activeItem, copyItem, deleteItem }: RowFormItemParams) {
    return <ElCol span={curComponent.__config__.span}>
      <ElRow class={["drawing-row-item", activeId === curComponent.id && "active-from-item"]}
        {...{
          onClick: $event => { activeItem(curComponent); $event.stopPropagation();  },
        }}>
        <span class="layout-name">{"row" + curComponent.id}</span>
        {/* <div class="drag-wrapper"></div> */}
        <TransitionGroup tag="div" name="slide"
          {...{
            class: "drag-wrapper",
            onDragover: ($event) => containerHandler.dragover($event),
            onDragenter: ($event) => containerHandler.dragenter($event, curComponent),
          }}
        >
          {curComponent.children.map(c => <div key={c.id}>{c.label}</div>)}
        </TransitionGroup>
        {itemBtns({ curComponent, copyItem, deleteItem })}
      </ElRow>
    </ElCol>;
  },
};

const containerHandler = {
  dragover: (e: DragEvent) => { // 拖拽组件，组件在容器中移动的时候
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    // e.dataTransfer!.effectAllowed = "move";
  },
  dragenter: (e: DragEvent, layoutComp: ElementComponent) => {
    // 拖拽组件，组件刚进入容器的时候
    // 从另一个组件上出来，进入容器上方的时候，也会触发
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    addNewElement(layoutComp);
  },
};

// 容器中添加一个新元素
const addNewElement = (layoutComp: ElementComponent) => {
  // 当前正在拖拽的元素
  const { dragging } = useDragging();
  const { drawingListDelete } = useDrawingList();

  if (!dragging.value) return;

  // 1-删除drawingList中的“当前元素”
  drawingListDelete(dragging.value);
  // 2-将“当前元素”添加进容器
  layoutComp.children.push(dragging.value);
  dragging.value = null;
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
