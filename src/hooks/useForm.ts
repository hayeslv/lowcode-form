import { useNodeList } from "~/hooks";
import { reactive } from "vue";

const { getNodeList } = useNodeList();
const form = reactive({});

export function useForm() {
  const getForm = () => {
    return form;
  };
  const setFormValue = (key: string, value: any) => {
    form[key] = value;
  };
  const initForm = () => {
    const nodeList = getNodeList();
    nodeList.forEach(node => {
      const { model, defaultValue } = node.instance;
      if (!form[model]) form[model] = defaultValue;
    });
  };

  return { getForm, setFormValue, initForm };
}
