import { CopyDocument, Delete } from "@element-plus/icons-vue";
import { ElCol, ElFormItem, ElIcon } from "element-plus";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";
import { renderComponentMap } from "~/config";
import "./index.scss";

const itemBtns = ({ curComponent, copyItem }) => {
  return [
    <span class="drawing-item-copy" title="复制" onClick={($event) => {
      copyItem(curComponent);
      $event.stopPropagation();
    }}>
      <ElIcon size={14}><CopyDocument /></ElIcon>
    </span>,
    <span class="drawing-item-delete" title="删除" onClick={() => {
      console.log("delete");
    }}>
      <ElIcon size={14}><Delete /></ElIcon>
    </span>,
  ];
};

interface ColFormItemParams {
  activeId: number | null;
  curComponent: ElementComponent;
  activeItem: (...args) => void;
  copyItem: (...args) => void;
}

const layouts = {
  colFormItem({ activeId, curComponent, activeItem, copyItem }: ColFormItemParams) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol class={["drawing-item", activeId === curComponent.id && "active-from-item"]} {...{
      onClick: $event => { activeItem(curComponent); $event.stopPropagation();  },
    }}>
      { curComponent.isMenuComponent && <svg-icon icon-class={curComponent.icon} /> }
      {
        !curComponent.isMenuComponent &&
        <ElFormItem label-width={labelWidth} label={curComponent.label || ""}>
          {renderComponentMap[curComponent.key] && renderComponentMap[curComponent.key](curComponent)}
        </ElFormItem>
      }
      {itemBtns({ curComponent, copyItem })}
    </ElCol>;
  },
};

export default defineComponent({
  props: {
    activeId: { type: Number },
    component: { type: Object as PropType<ElementComponent>, required: true },
    activeItem: { type: Function },
    copyItem: { type: Function },
  },
  setup() {},
  render() {
    const layout = layouts[this.component.layout];
    return layout({
      activeId: this.activeId,
      curComponent: this.component,
      activeItem: this.activeItem,
      copyItem: this.copyItem,
    });
  },
});
