import { defineComponent, reactive, ref } from "vue";
import { ElRow, ElForm, ElCol, ElFormItem, ElInput, ElButton } from "element-plus";

export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field105: "",
      field106: "",
      field107: "",
      field108: "",
      field109: "",
      field110: "",
    });
    return () => <ElRow>
      <ElForm ref={elForm} model={formData} label-width="100px">
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field105">
            <ElInput v-model={formData.field105} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field106">
            <ElInput v-model={formData.field106} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field107">
            <ElInput v-model={formData.field107} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field108">
            <ElInput v-model={formData.field108} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field109">
            <ElInput v-model={formData.field109} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={6} style="width: 100%;">
          <ElFormItem label="单行输入框" prop="field110">
            <ElInput v-model={formData.field110} placeholder="请输入文本内容" />
          </ElFormItem>
        </ElCol>
        <ElCol span={12} style="width: 100%;">
          <ElRow>
            <ElCol span={6} style="width: 100%;">
              <ElButton>查询</ElButton>
            </ElCol>
            <ElCol span={6} style="width: 100%;">
              <ElButton>重置</ElButton>
            </ElCol>
          </ElRow>
        </ElCol>
        <ElCol span={24} style="width: 100%;">
          <ElButton>按钮</ElButton>
        </ElCol>
      </ElForm>
    </ElRow>;
  },
});
