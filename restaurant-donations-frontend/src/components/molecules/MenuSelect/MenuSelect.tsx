import Text from "../../atoms/Text/Text";
import "./style.css";

type Options = {
  name: string;
  isSelected: boolean;
};

type Props = {
  options: Options[];
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  setOptions: React.Dispatch<React.SetStateAction<Options[]>>;
};

const MenuSelect = ({ options, onSelect, setOptions }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newOption = e.currentTarget.textContent || "";
    onSelect(newOption);
    setOptions(
      options.map((option) => {
        if (option.name === newOption) {
          return { name: option.name, isSelected: true };
        } else {
          return { name: option.name, isSelected: false };
        }
      })
    );
  };

  return (
    <div className="menu-select">
      {options.map((option, index) => (
        <div
          className={`menu-option ${
            option.isSelected ? "menu-option--selected" : ""
          }`}
          key={index}
          onClick={handleClick}
        >
          <Text text={option.name} isUnderlined={false} />
        </div>
      ))}
    </div>
  );
};

export default MenuSelect;
