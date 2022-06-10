import { ElCol, ElFormItem } from "element-plus";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";
import { renderComponentMap } from "~/config";

const layouts = {
  colFormItem(curComponent: ElementComponent) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol class="drawing-item">
      { curComponent.isMenuComponent && <svg-icon icon-class={curComponent.icon} /> }
      {
        !curComponent.isMenuComponent &&
        <ElFormItem label-width={labelWidth} label={curComponent.label || ""}>
          {renderComponentMap[curComponent.key] && renderComponentMap[curComponent.key]()}
        </ElFormItem>
      }

    </ElCol>;
  },
};

export default defineComponent({
  props: {
    component: { type: Object as PropType<ElementComponent>, required: true },
  },
  setup() {},
  render() {
    const layout = layouts[this.component.layout];
    return layout(this.component);
  },
});
