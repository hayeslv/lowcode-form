import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

const rules = {
  fileName: [
    { required: true, message: "请输入文件名", trigger: "blur" },
  ],
};

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: "" },
  },
  setup(props, { emit }) {
    const elForm = ref(null as any);
    const formData = reactive({
      fileName: "",
      type: "file",
    });

    const dialogMethods = {
      open() {
        formData.fileName = `${+new Date()}.vue`;
      },
      close() {
        emit("update:visible", false);
      },
      confirm() {
        elForm.value.validate((valid: boolean) => {
          if (!valid) return;
          emit("confirm", { ...formData });
          dialogMethods.close();
        });
      },
    };

    return () => <ElDialog
      width="500px"
      title={props.title}
      modelValue={props.visible}
      closeOnClickModal={false}
      appendToBody={true}
      onClose={dialogMethods.close}
      onOpen={dialogMethods.open}
      v-slots={{
        footer: () => <div class="dialog-footer">
          <ElButton onClick={dialogMethods.close}>取消</ElButton>
          <ElButton type="primary" onClick={dialogMethods.confirm}>确定</ElButton>
        </div>,
      }}
    >
      <ElForm ref={elForm} model={formData} rules={rules} labelWidth="100px">
        <ElFormItem label="文件名" prop="fileName">
          <ElInput v-model={formData.fileName} placeholder="请输入文件名" clearable />
        </ElFormItem>
      </ElForm>
    </ElDialog>;
  },
});
