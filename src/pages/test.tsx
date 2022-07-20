import { defineComponent, reactive, ref, onMounted } from "vue";
import { ElForm, ElFormItem, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch, ElTimePicker, ElDatePicker } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field102: "1",
      field103: "",
      field104: ["4", "3", "2"],
      field105: true,
      field108: "15:57:57",
      field109: ["15:57:57", "16:57:57"],
      field110: "2022-07-13 00:02:02",
      field113: [],
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
      <ElFormItem label="时间选择" prop="field108">
        <ElTimePicker style="width: 100%;" v-model={formData.field108} format="HH-mm-ss" valueFormat="HH:mm:ss" placeholder="请选择" />
      </ElFormItem>
      <ElFormItem label="时间范围" prop="field109">
        <ElTimePicker v-model={formData.field109} isRange={true} format="HH-mm-ss" valueFormat="HH:mm:ss" rangeSeparator="至" startPlaceholder="开始时间" endPlaceholder="结束时间" />
      </ElFormItem>
      <ElFormItem label="日期选择" prop="field110">
        <ElDatePicker v-model={formData.field110} placeholder="请选择" type="month" style="width: 100%;" format="YYYY-MM" valueFormat="YYYY-MM" />
      </ElFormItem>
      <ElFormItem label="日期范围" prop="field113">
        <ElDatePicker v-model={formData.field113} type="monthrange" format="YYYY-MM" valueFormat="YYYY-MM" startPlaceholder="开始日期" endPlaceholder="结束日期" rangeSeparator="至" />
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
