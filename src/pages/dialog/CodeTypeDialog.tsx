import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElRadioButton, ElRadioGroup } from "element-plus";
import type { PropType } from "vue";
import { defineComponent, reactive, ref } from "vue";
import type { DialogFormType, TopOperateType } from "~/types";

const rules = {
  fileName: [
    { required: true, message: "请输入文件名", trigger: "blur" },
  ],
};

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: "" },
    operateType: { type: String as PropType<TopOperateType>, required: true },
  },
  emits: ["update:visible", "confirm"],
  setup(props, { emit }) {
    const elForm = ref(null as any);
    const formData = reactive({
      fileName: "",
      type: "page",
    } as DialogFormType);
    const typeOptions = [
      { label: "页面", value: "page" },
      { label: "弹窗", value: "dialog" },
    ];

    const dialogMethods = {
      open() {
        formData.fileName = `${+new Date()}.tsx`;
      },
      close() {
        emit("update:visible", false);
      },
      confirm() {
        elForm.value.validate((valid: boolean) => {
          if (!valid) return;
          emit("confirm", { ...formData, operateType: props.operateType });
          dialogMethods.close();
        });
      },
    };

    return () => {
      const footerSlot = () => <div class="dialog-footer">
        <ElButton onClick={dialogMethods.close}>取消</ElButton>
        <ElButton type="primary" onClick={dialogMethods.confirm}>确定</ElButton>
      </div>;
      return <ElDialog
        width="500px"
        title={props.title}
        modelValue={props.visible}
        closeOnClickModal={false}
        appendToBody={true}
        onClose={dialogMethods.close}
        onOpen={dialogMethods.open}
        v-slots={{ footer: footerSlot }}
      >
        <ElForm ref={elForm} model={formData} rules={rules} labelWidth="100px">
          <ElFormItem label="生成类型" prop="type">
            <ElRadioGroup v-model={formData.type}>
              {
                typeOptions.map(v => <ElRadioButton label={v.value}>{v.label}</ElRadioButton>)
              }
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem label="文件名" prop="fileName">
            <ElInput v-model={formData.fileName} placeholder="请输入文件名" clearable />
          </ElFormItem>
        </ElForm>
      </ElDialog>;
    };
  },
});
