import "./style.css";

type Props = {
  text: string;
  isUnderlined: boolean;
};

const Text = ({ text, isUnderlined }: Props) => {
  return <span className={`${isUnderlined ? "underline" : ""}`}>{text}</span>;
};

export default Text;
