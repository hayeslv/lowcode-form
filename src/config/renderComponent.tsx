import { ElInput } from "element-plus";

export const renderComponentMap = {
  input: () => <ElInput />,
  textarea: () => <ElInput type="textarea" {...{ rows: 2 }} />,
};
