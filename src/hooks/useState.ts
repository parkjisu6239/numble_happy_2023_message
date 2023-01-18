import { isEqual, cloneDeep } from "lodash";

const useState = <T>(initialValue: T) => {
  let current = initialValue;
  const watchers: Function[] = [];

  return {
    getValue: () => cloneDeep(current),
    setValue: (newValue: T) => {
      const oldValue = cloneDeep(current);
      if (!isEqual(oldValue, newValue)) {
        current = cloneDeep(newValue);
        watchers.forEach((watcher) => {
          watcher(newValue);
        });
      }
    },
    addWatcher: (watcher: Function) => {
      watchers.push(watcher);
    },
  };
};

export type UseStateType<T> = ReturnType<typeof useState<T>>;

export default useState;
