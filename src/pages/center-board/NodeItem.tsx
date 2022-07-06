import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { FormNode } from "~/lowform-meta/instance/Node";

export default defineComponent({
  props: {
    node: { type: Object as PropType<FormNode> },
  },
  setup() {},
  render() {
    return <div>test</div>;
  },
});
