export const registerComponent = async() => {
  // const file = await import.meta.glob("./data/*.ts");
  const file = await import.meta.glob("./data/*.ts");
  return file;
};
