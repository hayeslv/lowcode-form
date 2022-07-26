import { ElDialog } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const dialogMethods = {
      close() {
        emit("update:visible", false);
      },
      confirm() {
      },
    };

    return () => {
      return <ElDialog
        width="980px"
        modelValue={props.visible}
        closeOnClickModal={false}
        appendToBody={true}
        onClose={dialogMethods.close}
      >
        <div>123123</div>
      </ElDialog>;
    };
  },
});
