import { defineComponent, reactive, ref } from "vue";
import type { FormRules } from "element-plus";
import { ElForm, ElFormItem, ElDatePicker, ElTimePicker, ElInput } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field149: [],
      field150: [],
      field146: "14:51:43",
      field148: "",
      field151: "",
    });
    const rules = reactive<FormRules>({
      field151: [
        { required: true, message: "请输入", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
      ],
    });

    return () => <ElForm ref={elForm} model={formData} rules={rules} label-width="100px">
      <ElFormItem label="日期范围" prop="field149">
        <ElDatePicker v-model={formData.field149} clearable type="daterange" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" startPlaceholder="开始日期" endPlaceholder="结束日期" rangeSeparator="至" />
      </ElFormItem>
      <ElFormItem label="时间范围" prop="field150">
        <ElTimePicker v-model={formData.field150} clearable isRange={true} format="HH:mm:ss" valueFormat="HH:mm:ss" rangeSeparator="至" startPlaceholder="开始时间" endPlaceholder="结束时间" />
      </ElFormItem>
      <ElFormItem label="时间选择" prop="field146">
        <ElTimePicker style="width: 100%;" v-model={formData.field146} clearable format="HH:mm:ss" valueFormat="HH:mm:ss" placeholder="请选择" />
      </ElFormItem>
      <ElFormItem label="日期选择" prop="field148">
        <ElDatePicker v-model={formData.field148} clearable placeholder="请选择" type="date" style="width: 100%;" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field151">
        <ElInput v-model={formData.field151} placeholder="请输入" clearable  />
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
