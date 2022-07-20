import { defineComponent, reactive, ref, onMounted } from "vue";
import { ElForm, ElFormItem, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch, ElTimePicker } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field102: "1",
      field103: "",
      field104: ["4", "3", "2"],
      field105: true,
      field109: "19-09-06",
    });
    const formOptions = reactive({
      field102Options: [],
      field103Options: [],
    });
    const getField102Options = async() => {
      const response = await fetch("https://www.fastmock.site/mock/8fc9fb44ed4532591a31c3f669237dec/api/selectList-other", { method: "GET" });
      const json = await response.json();
      formOptions.field102Options = json;
    };
    const getField103Options = async() => {
      const response = await fetch("https://www.fastmock.site/mock/8fc9fb44ed4532591a31c3f669237dec/api/selectList", { method: "GET" });
      const json = await response.json();
      formOptions.field103Options = json;
    };
    onMounted(() => {
      getField102Options();
      getField103Options();
    });

    return () => <ElForm ref={elForm} model={formData} label-width="100px">
      <ElFormItem label="下拉选择" prop="field102">
        <ElSelect v-model={formData.field102} placeholder="请选择" style="width: 100%;">
          { formOptions.field102Options.map((v: Record<string, number | string>) => <ElOption label={v.label} value={v.value} />) }
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="单选框" prop="field103">
        <ElRadioGroup v-model={formData.field103}>
          { formOptions.field103Options.map((v: Record<string, number | string>) => <ElRadio label={v.value}>{v.label}</ElRadio>) }
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="多选框" prop="field104">
        <ElCheckboxGroup v-model={formData.field104}>
          <ElCheckbox label="2">选项二</ElCheckbox>
          <ElCheckbox label="1">选项yi</ElCheckbox>
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem label="开关" prop="field105">
        <ElSwitch v-model={formData.field105} />
      </ElFormItem>
      <ElFormItem label="时间选择" prop="field109">
        <ElTimePicker v-model={formData.field109} format="HH:mm:ss" valueFormat="HH:mm:ss" placeholder="请选择" />
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
