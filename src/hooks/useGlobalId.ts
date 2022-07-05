let globalId = 100;

// 使用全局ID
export const useGlobalId = () => {
  const getGlobalId = (): number => {
    return ++globalId;
  };
  const setGlobalId = (id: number) => {
    globalId = id;
  };
  return { getGlobalId, setGlobalId };
};
