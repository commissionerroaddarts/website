// utils/debouncePromise.ts
export const debouncePromise = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  let promise: Promise<any> | null = null;

  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      promise = fn(...args);
    }, delay);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await promise;
        resolve(result);
      }, delay);
    });
  }) as T;
};
