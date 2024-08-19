import "./style.css";

type Props = {
  text: string;
  onClick: () => void;
  isDisabled: boolean;
};

const Button = ({ text, onClick, isDisabled }: Props) => {
  return (
    <button className="button" onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;
