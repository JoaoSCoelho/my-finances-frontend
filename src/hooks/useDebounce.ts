let timeout: NodeJS.Timeout;

export default function useDebounce(defaultTime = 500) {
  return (func: () => void, time: number = defaultTime) => {
    clearTimeout(timeout || '');

    timeout = setTimeout(func, time);
  };
}
