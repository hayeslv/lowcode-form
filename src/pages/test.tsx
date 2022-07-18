import { defineComponent, reactive, ref, onMounted } from "vue";
import { ElForm, ElFormItem, ElSelect, ElOption, ElRadioGroup, ElRadio, ElInput, ElCheckboxGroup, ElCheckbox } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field105: "",
      field103: "2",
      field102: "",
      field101: "",
      field104: [],
    });
    const formOptions = reactive({
      field105Options: [],
      field103Options: [],
      field104Options: [],
    });
    const getField105Options = async() => {
      const response = await fetch("https://www.fastmock.site/mock/8fc9fb44ed4532591a31c3f669237dec/api/getPersonList", { method: "GET" });
      const json = await response.json();
      const list = (json.list || []).map(v => ({ label: v.name, value: v.id }));
      formOptions.field105Options = list;
    };
    const getField103Options = async() => {
      const response = await fetch("https://www.fastmock.site/mock/8fc9fb44ed4532591a31c3f669237dec/api/selectList", { method: "GET" });
      const json = await response.json();
      formOptions.field103Options = json;
    };
    const getField104Options = async() => {
      const response = await fetch("https://www.fastmock.site/mock/8fc9fb44ed4532591a31c3f669237dec/api/getPersonList", { method: "GET" });
      const json = await response.json();
      const list = (json.list || []).map(v => ({ label: v.name, value: v.id }));
      formOptions.field104Options = list;
    };
    onMounted(() => {
      getField105Options();
      getField103Options();
      getField104Options();
    });

    return () => <ElForm class="half" ref={elForm} model={formData} label-width="100px">
      <ElFormItem class="full" label="下拉选择" prop="field105">
        <ElSelect v-model={formData.field105} placeholder="请选择" style="width: 100%;">
          { formOptions.field105Options.map((v: Record<string, number | string>) => <ElOption label={v.label} value={v.value} />) }
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="单选框" prop="field103">
        <ElRadioGroup v-model={formData.field103}>
          { formOptions.field103Options.map((v: Record<string, number | string>) => <ElRadio label={v.value}>{v.label}</ElRadio>) }
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field102">
        <ElInput type="textarea" v-model={formData.field102} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field101">
        <ElInput v-model={formData.field101} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem class="full" label="多选框" prop="field104">
        <ElCheckboxGroup v-model={formData.field104}>
          { formOptions.field104Options.map((v: Record<string, number | string>) => <ElCheckbox label={v.value}>{v.label}</ElCheckbox>) }
        </ElCheckboxGroup>
      </ElFormItem>
    </ElForm>;
  },
});

// .el-form {
//   display: flex;
//   flex-wrap: wrap;
//   &.half {
//     > .el-form-item {
//       width: 50%;
//     }
//   }
//   > .el-form-item {
//     display: flex;
//     align-items: flex-start;
//     width: 100%;
//     &.full {
//       width: 100%;
//     }
//   }
// }
