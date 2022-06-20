const globalMap = new Map();

export const enum GlobelItem {
  beautifier = "BEAUTIFIER",
}

export const useGlobalObject = () => {
  const getGlobalItem = (key: string) => {
    return globalMap.get(key);
  };
  const setGlobalItem = (key: string, value: any) => {
    globalMap.set(key, value);
  };

  return { getGlobalItem, setGlobalItem };
};
