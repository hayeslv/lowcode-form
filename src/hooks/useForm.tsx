import { reactive } from "vue";

// 使用form表单
export const useForm = (() => {
  const form = reactive({});
  return () => {
    const getForm = () => {
      return form;
    };
    const setFormValue = (key: string, value?: any) => {
      form[key] = value;
    };

    return { getForm, setFormValue };
  };
})();
