export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field170: "",
      field168: "",
      field173: "4",
      field163: "",
      field164: "",
      field172: "2",
      field170: "",
    });
    return () => <ElDialog
      modelValue={props.visible}
      title="Dialog Title"
      v-slots={{
        footer: () => <div class="dialog-footer">
          <ElButton onClick={() => emit("update:visible", false)}>取消</ElButton>
          <ElButton type="primary" onClick={() => emit("update:visible", false)}>确定</ElButton>
        </div>,
      }}>
      <ElForm ref={elForm} model={formData} label-width="100px">
        <ElFormItem label-width="120px" label="输入框12" prop="field170">
          <ElInput v-model={formData.field170} placeholder="请输入1" />
        </ElFormItem>
        <ElFormItem  label="输入框" prop="field168">
          <ElInput v-model={formData.field168} placeholder="请输入" />
        </ElFormItem>
        <ElFormItem  label="单选框" prop="field173">
          <ElRadioGroup v-model={formData.field173}>
            <ElRadio label="2">选项二</ElRadio>
            <ElRadio label="4">选项三</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem  label="多行输入框" prop="field163">
          <ElInput type="textarea" v-model={formData.field163} placeholder="请输入22" />
        </ElFormItem>
        <ElFormItem  label="多行输入框" prop="field164">
          <ElInput type="textarea" v-model={formData.field164} placeholder="请输入11" />
        </ElFormItem>
        <ElFormItem  label="下拉选择" prop="field172">
          <ElSelect v-model={formData.field172} placeholder="请选择" style="width: 100%;">
            <ElOption label="选项二" value="2" />
            <ElOption label="" value="" />
            <ElOption label="" value="" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem  label="多行输入框" prop="field170">
          <ElInput type="textarea" v-model={formData.field170} placeholder="请输入" />
        </ElFormItem>
      </ElForm>
    </ElDialog>;
  },
});
