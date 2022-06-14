import { ElForm, ElFormItem } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  render() {
    return <ElForm label-width="90px">
      <ElFormItem label="表单名">
        表单名
      </ElFormItem>
    </ElForm>;
  },
});
