import Image from "../../atoms/Image/Image";
import Text from "../../atoms/Text/Text";
import "./style.css";

type Props = {
  ingredientName: string;
  ingredientQty: number;
};

const Ingredient = ({ ingredientName, ingredientQty }: Props) => {
  return (
    <div className="ingredient">
      <Image imageName={ingredientName} />
      <Text text={ingredientName} isUnderlined={false} />
      <Text text={`Qty: ${ingredientQty}`} isUnderlined={false} />
    </div>
  );
};

export default Ingredient;
