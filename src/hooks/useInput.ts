import { useState, useCallback } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 구조 분해 할당
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, onChange, reset };
};

export default useInput;
