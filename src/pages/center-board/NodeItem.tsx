import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { wrapFormItem } from "~/utils";

export default defineComponent({
  props: {
    node: { type: Object as PropType<FormNode>, required: true },
  },
  setup(props) {
    const instance = props.node.instance;
    const nodeRender = instance.render();
    const render = wrapFormItem(nodeRender, { label: instance.label });
    return () => <div>
      { render }
    </div>;
  },
});
