import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadio, ElSelect, ElOption, ElCheckboxGroup, ElCheckbox } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field179: "",
      field177: "",
      field184: "",
      field178: "",
      field181: "",
      field180: "",
      field186: "11",
      field182: "222",
      field183: "1",
      field185: "2",
      field187: "33",
      field188: "2",
      field200: [],
    });

    const options = [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
    ];

    return () => <ElForm class="half" ref={elForm} model={formData} label-width="100px">
      <ElFormItem class="full" label="输入框" prop="field179">
        <ElInput v-model={formData.field179} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field177">
        <ElInput type="textarea" v-model={formData.field177} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="单选框" prop="field184">
        <ElRadioGroup v-model={formData.field184}>
          <ElRadio label="1">选项一</ElRadio>
          <ElRadio label="2">选项二</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="下拉选择" prop="field178">
        <ElSelect v-model={formData.field178} placeholder="请选择" style="width: 100%;">
          <ElOption label="选项一" value="1" />
          <ElOption label="选项二" value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="输入框" prop="field181">
        <ElInput v-model={formData.field181} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field180">
        <ElInput v-model={formData.field180} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field186">
        <ElInput type="textarea" v-model={formData.field186} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field182">
        <ElInput v-model={formData.field182} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="单选框" prop="field183">
        <ElRadioGroup v-model={formData.field183}>
          <ElRadio label="1">选项一</ElRadio>
          <ElRadio label="2">选项二</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="单选框" prop="field185">
        <ElRadioGroup v-model={formData.field185}>
          <ElRadio label="1">选项一</ElRadio>
          <ElRadio label="2">选项二</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field187">
        <ElInput type="textarea" v-model={formData.field187} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="下拉选择" prop="field188">
        <ElSelect v-model={formData.field188} placeholder="请选择" style="width: 100%;">
          <ElOption label="选项一" value="1" />
          <ElOption label="选项二" value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="测试多选" prop="field200">
        <ElCheckboxGroup style="width: 100%;" v-model={formData.field200}>
          {options.map(v => (
            <ElCheckbox label={v.value}>{v.label}</ElCheckbox>
          ))}
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
