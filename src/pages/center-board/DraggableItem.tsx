import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { ElementComponent } from "~/config";

export default defineComponent({
  props: {
    component: { type: Object as PropType<ElementComponent>, required: true },
  },
  setup() {},
  render() {
    return <div class="drawing-item">
      {this.component.isMenuComponent && <svg-icon icon-class={this.component.icon} />}
      {this.component.label}
    </div>;
  },
});
