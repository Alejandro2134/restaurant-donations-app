import { ChangeEvent, useState } from "react";

type Props = {
  min: number;
  max: number;
  setExternal: React.Dispatch<React.SetStateAction<number>>;
};

const Input = ({ min, max, setExternal }: Props) => {
  const [value, setValue] = useState<string>(`${min}`);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setExternal(+newValue);
  };

  const handleBlur = () => {
    if (value === "" || +value < min) {
      setValue(`${min}`);
      setExternal(min);
    } else if (+value > max) {
      setValue(`${max}`);
      setExternal(max);
    }
  };

  return (
    <input
      type="number"
      max={max}
      min={min}
      onChange={onChange}
      onBlur={handleBlur}
      value={`${value}`}
      placeholder={`Enter a number between ${min} and ${max}`}
    />
  );
};

export default Input;
