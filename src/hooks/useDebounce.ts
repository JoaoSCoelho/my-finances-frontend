let timeout: NodeJS.Timeout;

/** @param defaultTime default is `500` milliseconds */
export default function useDebounce(defaultTime = 500) {
  return (func: () => void, time: number = defaultTime) => {
    clearTimeout(timeout || '');

    timeout = setTimeout(func, time);
  };
}
