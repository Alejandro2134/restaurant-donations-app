import Ingredient from "../../molecules/Ingredient/Ingredient";
import "./style.css";

type Props = {
  ingredients: {
    ingredientName: string;
    ingredientQty: number;
  }[];
};

const IngredientsList = ({ ingredients }: Props) => {
  return (
    <div className="ingredient-list">
      {ingredients.map((ingredient, index) => (
        <Ingredient
          key={index}
          ingredientName={ingredient.ingredientName}
          ingredientQty={ingredient.ingredientQty}
        />
      ))}
    </div>
  );
};

export default IngredientsList;
