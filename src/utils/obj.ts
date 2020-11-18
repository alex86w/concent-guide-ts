export function getOneKeyValPair(obj: any) {
  const keyValPair: { key: string; value: any } = { key: "", value: "" };
  Object.keys(obj).forEach((key) => {
    keyValPair.key = key;
    keyValPair.value = obj[key];
  });
  return keyValPair;
}
