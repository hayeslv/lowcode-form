import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadio } from "element-plus";

export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      username: "",
      password: "",
      field106: "",
    });
    return () => <ElForm ref={elForm} model={formData} label-width="100px">
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model={formData.username} placeholder="请输入文本内容" />
      </ElFormItem>
      <ElFormItem label="密码框" prop="password">
        <ElInput type="password" showPassword v-model={formData.password} placeholder="请输入密码" />
      </ElFormItem>
      <ElFormItem label="单选框" prop="field106">
        <ElRadioGroup v-model={formData.field106}>
          <ElRadio label="1">选项一</ElRadio>
          <ElRadio label="2">选项二</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
    </ElForm>;
  },
});
