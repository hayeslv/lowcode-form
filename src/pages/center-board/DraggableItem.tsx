import { ElCol, ElFormItem } from "element-plus";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";

const layouts = {
  colFormItem(curComponent: ElementComponent) {
    const config = curComponent.__config__;
    const labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    return <ElCol span={config.span} class="drawing-item">
      <ElFormItem label-width={labelWidth}>
        {curComponent.label}
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
