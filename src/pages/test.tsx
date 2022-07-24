import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElTimePicker, ElDatePicker } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field157: "",
      field158: "",
      field159: "",
      field161: [],
      field162: "",
      field160: [],
    });
    const rules = reactive({
      field157: [
        { required: true, message: "请输入", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
      ],
    });

    return () => <ElForm ref={elForm} model={formData} rules={rules} label-width="100px">
      <ElFormItem label="输入框" prop="field157">
        <ElInput v-model={formData.field157} placeholder="请输入" clearable  />
      </ElFormItem>
      <ElFormItem label="下拉选择" prop="field158">
        <ElSelect v-model={formData.field158} placeholder="请选择" clearable style="width: 100%;">
          <ElOption label="选项一" value="1" />
          <ElOption label="选项二" value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="时间选择" prop="field159">
        <ElTimePicker style="width: 100%;" v-model={formData.field159} clearable format="HH:mm:ss" valueFormat="HH:mm:ss" placeholder="请选择" />
      </ElFormItem>
      <ElFormItem label="日期范围" prop="field161">
        <ElDatePicker v-model={formData.field161} clearable type="daterange" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" startPlaceholder="开始日期" endPlaceholder="结束日期" rangeSeparator="至" />
      </ElFormItem>
      <ElFormItem label="日期选择" prop="field162">
        <ElDatePicker v-model={formData.field162} clearable placeholder="请选择" type="date" style="width: 100%;" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
      </ElFormItem>
      <ElFormItem label="时间范围" prop="field160">
        <ElTimePicker v-model={formData.field160} clearable isRange={true} format="HH:mm:ss" valueFormat="HH:mm:ss" rangeSeparator="至" startPlaceholder="开始时间" endPlaceholder="结束时间" />
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
