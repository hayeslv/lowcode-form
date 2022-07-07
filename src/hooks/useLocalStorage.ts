export function useLocalStorage() {
  const getItem = (key: string): string | null => {
    const value = localStorage.getItem(key);
    return value;
  };

  // 字符串、数组、对象
  const setItem = (key: string, value: string | any[] | Record<string, any>) => {
    let str = "";
    if (typeof value === "string") {
      str = value;
    } else {
      str = JSON.stringify(value);
    }
    localStorage.setItem(key, str);
  };

  const getItemJson = (key: string) => {
    const str = localStorage.getItem(key);
    if (!str) return null;
    try {
      const json = JSON.parse(str);
      return json;
    } catch (error) {
      return str;
    }
  };

  return { getItem, setItem, getItemJson };
}
