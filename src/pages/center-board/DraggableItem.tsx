import { ElCol, ElFormItem } from "element-plus";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";

const layouts = {
  colFormItem(curComponent: ElementComponent) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol class="drawing-item">
      <ElFormItem label-width={labelWidth} label={curComponent.label || ""}>
        {curComponent.isMenuComponent && <svg-icon icon-class={curComponent.icon} />}
        {!curComponent.isMenuComponent && curComponent.render()}
      </ElFormItem>
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
    console.log(this.component);
    // return <div class="drawing-item">
    //   {layout(this.component)}
    //   {/* {this.component.isMenuComponent && <svg-icon icon-class={this.component.icon} />}
    //   {this.component.label} */}
    // </div>;
    return layout(this.component);
  },
});
