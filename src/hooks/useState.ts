const useState = <T>(initialValue: T) => {
  let current = initialValue;
  const watchers: Function[] = [];

  return {
    getValue: () => current,
    setValue: (newValue: T) => {
      const oldValue = current;
      if (oldValue !== newValue) {
        current = newValue;
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

export default useState;
