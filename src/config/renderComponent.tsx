import { ElInput, ElInputNumber } from "element-plus";

export const renderComponentMap = {
  input: () => <ElInput placeholder="请输入单行文本" />,
  textarea: () => <ElInput placeholder="请输入多行文本" type="textarea" {...{ rows: 2 }} />,
  number: () => <ElInputNumber placeholder="计数器" />,
};
