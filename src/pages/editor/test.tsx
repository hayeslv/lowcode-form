import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import { AddLocation, Box, Briefcase } from "@element-plus/icons-vue";
import "./test.scss";
export default defineComponent({
  setup() {
    const elForm = ref();
    const formData = reactive({
      field101: "2312312314",
      field103: "",
      field104: "",
      field105: "",
    });
    const rules = reactive({

    });

    return () => <ElForm ref={elForm} model={formData} rules={rules} label-width="100px">
      <ElFormItem label="输入框" prop="field101">
        <ElInput v-model={formData.field101} placeholder="请输入" clearable  prefixIcon={AddLocation}  />
      </ElFormItem>
      <ElFormItem label="多行输入框" prop="field103">
        <ElInput type="textarea" v-model={formData.field103} placeholder="请输入"  />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field104">
        <ElInput v-model={formData.field104} placeholder="请输入" clearable  prefixIcon={Box} suffixIcon={Briefcase} />
      </ElFormItem>
      <ElFormItem label="输入框" prop="field105">
        <ElInput v-model={formData.field105} placeholder="请输入" clearable  prefixIcon={AddLocation}  />
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
