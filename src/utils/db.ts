import { isProxy, ref, toRaw, watch } from "vue";
import type { ElementComponent } from "~/config";
import { getOriginArray } from "./vue";

// 先使用localStorage存储，之后可能会改为数据库存储
const DRAWING_LIST = "lowcode_drawing_list"; // 当前绘制组件列表
const FORM_CONFIG = "lowcode_form_conig"; // 表单配置

export function getDrawingList(): ElementComponent[] {
  const str = localStorage.getItem(DRAWING_LIST);
  try {
    if (str) return JSON.parse(str);
  } catch (error) {
    console.error(error);
  }
  return [];
}

// 存储drawingList
export function saveDrawingList(list: ElementComponent[]) {
  if (isProxy(list)) {
    list = getOriginArray(list);
  }
  try {
    localStorage.setItem(DRAWING_LIST, JSON.stringify(list));
  } catch (error) {
    console.error(error);
  }
}
// 获取全局DrawingList的最大id
export const getDrawingListMaxId = () => {
  const list = getDrawingList();
  if (list.length === 0) return 0;
  return Math.max(...list.map(v => v.id || 0));
};

/* ---------------------------------------- 表单属性 ---------------------------------------- */

const defaultFormConfig = {
  formRef: "elForm",
  formModel: "formData",
  formRules: "rules",
  labelWidth: 100,
  gutter: 15,
  labelPosition: "right",
  disabled: false,
};
const formConfig = ref(defaultFormConfig);

export const useFormConfig = () => {
  let isInit = false;
  // 获取表单配置
  const getFormConfig = () => {
    if (!isInit) { // 如果没有尝试过从db中获取数据，则尝试一次
      isInit = true;
      initFormConfig();
    }
    return formConfig.value;
  };
  // 设置表单配置
  const setFormConfig = (obj) => {
    formConfig.value = obj;
  };
  // 存储表单配置
  const saveFormConfig = () => {
    const str = toRaw(formConfig.value);
    localStorage.setItem(FORM_CONFIG, JSON.stringify(str));
  };
  // 根据db内容进行初始化
  const initFormConfig = () => {
    const str = localStorage.getItem(FORM_CONFIG);
    if (!str) return;
    try {
      const object = JSON.parse(str);
      formConfig.value = object;
    } catch (error) {
      console.error(error);
    }
  };

  watch(() => formConfig.value, () => {
    saveFormConfig();
  }, { deep: true });

  return { getFormConfig, setFormConfig };
};
