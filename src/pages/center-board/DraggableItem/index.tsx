import { CopyDocument, Delete } from "@element-plus/icons-vue";
import { ElCol, ElFormItem, ElIcon, ElRow } from "element-plus";
import type { PropType } from "vue";
import { toRaw, TransitionGroup, defineComponent } from "vue";

import { useComponentRender, useDragging, useDrawingList, useForm } from "~/hooks";
import type { IComponent } from "~/types";
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
  curComponent: IComponent;
  container?: IComponent;
  activeItem: (...args) => void;
  copyItem: (...args) => void;
  deleteItem: (...args) => void;
}
interface RowFormItemParams {
  activeId?: number;
  curComponent: IComponent;
  activeItem: (...args) => void;
  copyItem: (...args) => void;
  deleteItem: (...args) => void;
}

let childDragging = false;
let curContainer; // 当前容器

const blockHandler = {
  dragstart: (e: DragEvent, item: IComponent, container?: IComponent) => {
    if (childDragging) return;
    if (container) {
      childDragging = true;
      curContainer = container;
    }
    // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
    setDraggingValueAsync(item);
  },
  dragend: () => {
    childDragging = false;
    setDraggingValue(null);
  },
  dragenter: (e: DragEvent, item: IComponent, container?: IComponent) => {
    e.preventDefault();
    if (!dragging.value) return;
    if (item.id === dragging.value?.id) return; // 如果目标是“当前拖动元素”，则直接return
    if (item.transiting) return; // 如果正在进行动画，则直接return
    // TODO 待优化：1-容器内部元素也会触发；
    // console.log(item); // 不要删

    if (item.type === "layout") {
      // 查看children中是否已经存在了
      if (item.children!.some(v => v.id === dragging.value?.id)) return;
      item.children!.push(dragging.value);
      drawingListDelete(dragging.value);
      return;
    }

    // 拖拽元素在容器中，目标元素不在容器中的情况
    if (!container && curContainer) {
      if (curContainer.children.includes(dragging.value)) {
        // 删除容器中的元素
        const index = curContainer.children.map(v => v.id).findIndex(v => v === dragging.value!.id);
        curContainer.children.splice(index, 1);
      }
    }

    if (container) {
      // 在容器内交换位置
      const itemIndex = container.children!.findIndex(v => v.id === item.id);
      const draggingIndex = container.children!.findIndex(v => v.id === dragging.value!.id);
      if (draggingIndex === -1) {
        // 查看children中是否已经存在了
        if (!container.children!.some(v => v.id === item.id)) {
          // 从容器外拖进来容器
          container.children!.push(item);
        }
      } else {
        // 容器内交换位置
        [container.children![draggingIndex], container.children![itemIndex]] = [container.children![itemIndex], container.children![draggingIndex]];
      }

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

const containerHandler = {
  dragstart: (e: DragEvent, item: IComponent) => {
    if (childDragging) return;
    // 异步对当前元素进行激活，可以让浏览器复制出来的ghost不带横线
    setDraggingValueAsync(item);
  },
  dragend: () => {
    childDragging = false;
    setDraggingValue(null);
  },
  dragenter: (e: DragEvent, item: IComponent) => {
    e.preventDefault();
    if (!dragging.value) return;
    if (item.id === dragging.value?.id) return; // 如果目标是“当前拖动元素”，则直接return
    if (item.transiting) return; // 如果正在进行动画，则直接return

    if (item.type === "layout") {
      // 查看children中是否已经存在了
      if (item.children!.some(v => v.id === dragging.value?.id)) return;
      item.children!.push(dragging.value);
      drawingListDelete(dragging.value);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dragleave: (e: DragEvent, container: IComponent) => {
    e.preventDefault();
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

const { getComponentRender } = useComponentRender();
const { getForm } = useForm();
const form = getForm();

const layouts = {
  colFormItem({ activeId, curComponent, container, activeItem, copyItem, deleteItem }: ColFormItemParams) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    const render = getComponentRender(curComponent.key)({
      model: Object.keys(curComponent.model || {}).reduce((prev, propName) => {
        const modelName = curComponent.__vModel__;
        prev[propName] = {
          [propName === "default" ? "modelValue" : propName]: modelName ? form[modelName] : null,
          [propName === "default" ? "onUpdate:modelValue" : "onChange"]: (val: any) => {
            !!modelName && (form[modelName] = val);
            curComponent.__config__.defaultValue = val;
          },
        };
        return prev;
      }, {} as Record<string, any>),
      component: curComponent,
    });
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
          { render }
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
          onDragstart: ($event) => containerHandler.dragstart($event, curComponent),
          onDragenter: ($event) => containerHandler.dragenter($event, curComponent),
          onDragleave: ($event) => containerHandler.dragleave($event, curComponent),
          onDragend: () => containerHandler.dragend(),
        }}>
        <span class="layout-name">{"row" + curComponent.id}</span>
        <TransitionGroup tag="div" name="slide"
          {...{
            class: "drag-wrapper",
          }}
        >
          {curComponent.children!.map(c => layouts[c.layout]({ activeId, curComponent: c, container: curComponent, activeItem, copyItem, deleteItem }))}
        </TransitionGroup>
        {itemBtns({ curComponent, copyItem, deleteItem })}
      </ElRow>
    </ElCol>;
  },
};

export default defineComponent({
  props: {
    activeId: { type: Number },
    component: { type: Object as PropType<IComponent>, required: true },
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
