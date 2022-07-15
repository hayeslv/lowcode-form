import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadio, ElSelect, ElOption, ElCheckboxGroup, ElCheckbox } from "element-plus";
import "./test.scss";
export default defineComponent({
  setup(props, { emit }) {
    const elForm = ref();
    const formData = reactive({
      field101: "",
      field102: "",
      field103: "",
      field105: "",
      field104: [],
    });
    return () => <ElForm class="half" ref={elForm} model={formData} label-width="100px">
      <ElFormItem label="输入框" prop="field101">
        <ElInput v-model={formData.field101} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field102">
        <ElInput type="textarea" v-model={formData.field102} placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="单选框" prop="field103">
        <ElRadioGroup v-model={formData.field103}>
          <ElRadio label="1">选项一</ElRadio>
          <ElRadio label="2">选项二</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="下拉选择" prop="field105">
        <ElSelect v-model={formData.field105} placeholder="请选择" style="width: 100%;">
          <ElOption label="选项一" value="1" />
          <ElOption label="选项二" value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem class="full" label="多选框" prop="field104">
        <ElCheckboxGroup v-model={formData.field104}>
          <ElCheckbox label="1">选项一</ElCheckbox>
          <ElCheckbox label="2">选项二</ElCheckbox>
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
