import { ref, toRaw, unref, watch } from "vue";
import { debounce } from "lodash";
import { Global } from "~/config";
import { useLocalStorage } from "./useLocalStorage";

export interface FormConfigType {
  formRef: string;
  formModel: string;
  formRules?: string;
  labelWidth: number;
  labelPosition: string;
}

const defaultFormConfig: FormConfigType = {
  formRef: "elForm",
  formModel: "formData",
  formRules: "rules",
  labelWidth: 100,
  labelPosition: "right",
};

const formConfig = ref(defaultFormConfig);
const { getItemJson, setItem } = useLocalStorage();

// 保存到缓存
watch(() => formConfig.value, debounce(() => {
  setItem(Global.NameFormConfig, toRaw(unref(formConfig)));
}, 300), { deep: true });

export function useFormConfig() {
  let inited = false; // 是否初始化过了

  // 初始化表单配置
  const initFormConfig = () => {
    // 从缓存中获取数据
    const json = getItemJson(Global.NameFormConfig);
    if (json) formConfig.value = json;
  };

  // 获取表单配置
  const getFormConfig = () => {
    if (!inited) {
      // 如果没有初始化过，则执行一次初始化
      inited = true;
      initFormConfig();
    }
    return formConfig.value;
  };

  // 设置表单配置
  const setFormConfig = (obj: FormConfigType) => {
    formConfig.value = obj;
  };

  return { getFormConfig, setFormConfig };
}
