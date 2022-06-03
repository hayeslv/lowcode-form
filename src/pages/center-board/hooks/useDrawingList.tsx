import { ref } from "vue";

export function useDrawingList() {
  const drawingList = ref([] as any[]);

  const drawingListAdd = (element) => {
    drawingList.value.push(element);
  };

  const initData = () => {
    drawingList.value = [
      { name: "john", id: 1 },
      { name: "dylan", id: 2 },
      { name: "jean", id: 3 },
    ];
  };

  initData();

  return {
    drawingList,
    drawingListAdd,
  };
}
