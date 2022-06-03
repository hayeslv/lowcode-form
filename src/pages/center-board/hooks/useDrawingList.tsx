import { ref } from "vue";
import type { ElementComponent } from "~/config";

export function useDrawingList() {
  const drawingList = ref([] as ElementComponent[]);

  const drawingListAdd = (element) => {
    drawingList.value.push(element);
  };

  const initData = () => {
    drawingList.value = [
      { id: 1, key: "input", label: "输入框", icon: "" },
      { id: 2, key: "textarea", label: "多行框", icon: "" },
      { id: 3, key: "select", label: "下拉框", icon: "" },
      { id: 4, key: "radio", label: "单选", icon: "" },
    ];
  };

  initData();

  return {
    drawingList,
    drawingListAdd,
  };
}
