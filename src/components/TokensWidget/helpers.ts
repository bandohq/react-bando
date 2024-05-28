export function fillArray<T>(mod = 5, arr: T[], maxLength = 10) {
  if (arr.length >= maxLength) return [...arr].splice(0, maxLength);
  let newArr: (T | null)[] = [];
  newArr = [...arr];
  while (newArr?.length % mod !== 0) {
    newArr?.push(null);
  }
  return [...newArr];
}
