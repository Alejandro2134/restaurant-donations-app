import Text from "../../atoms/Text/Text";
import IngredientsList from "../../organisms/IngredientsList/IngredientList";
import "./style.css";

type Recipe = {
  recipeName: string;
  ingredients: {
    ingredientName: string;
    ingredientQty: number;
  }[];
};

type Props = {
  recipes: Recipe[];
};

const Recipes = ({ recipes }: Props) => {
  return (
    <div className="recipes">
      {recipes.map((recipe, index) => (
        <div key={index}>
          <Text text={recipe.recipeName} isUnderlined={false} />
          <IngredientsList ingredients={recipe.ingredients} />
        </div>
      ))}
    </div>
  );
};

export default Recipes;
