import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElTimePicker, ElSwitch } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field117: "11111111111111111111111111111111111111111",
      field118: "",
      field119: "",
      field121: "",
      field122: "15:45:08",
      field123: true,
      field124: "",
    });

    return () => <ElForm ref={elForm} model={formData} label-width="100px">
      <ElFormItem label="输入框" prop="field117">
        <ElInput v-model={formData.field117} placeholder="请输入"  />
      </ElFormItem>
      <ElFormItem label="日期范围" prop="field118">
        <ElDatePicker v-model={formData.field118} type="daterange" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" startPlaceholder="开始日期" endPlaceholder="结束日期" rangeSeparator="至" />
      </ElFormItem>
      <ElFormItem label="日期选择" prop="field119">
        <ElDatePicker v-model={formData.field119} placeholder="请选择" type="date" style="width: 100%;" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
      </ElFormItem>
      <ElFormItem label="时间选择" prop="field121">
        <ElTimePicker style="width: 100%;" v-model={formData.field121} format="HH:mm:ss" valueFormat="HH:mm:ss" placeholder="请选择" />
      </ElFormItem>
      <ElFormItem label="时间选择" prop="field122">
        <ElTimePicker style="width: 100%;" v-model={formData.field122} format="HH:mm:ss" valueFormat="HH:mm:ss" placeholder="请选择" />
      </ElFormItem>
      <ElFormItem label="开关" prop="field123">
        <ElSwitch v-model={formData.field123} />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field124">
        <ElInput v-model={formData.field124} placeholder="请输入" {...{ maxlength: 11 }} />
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
