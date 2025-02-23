export const callEvent = <T>(fn: (...params: T[]) => void, ...args: T[]) => {
  return () => {
    if (fn) {
      fn(...args);
    }
  };
};
