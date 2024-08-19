import { useEffect, useState } from "react";
import IngredientsList from "../../organisms/IngredientsList/IngredientList";
import "./style.css";
import Loader from "../../atoms/Loader/Loader";

const foodStorageServiceUrl =
  process.env.REACT_APP_FOOD_STORAGE_SERVICE_URL || "http://localhost:3002";

type FoodStorageRes = {
  tomato: number;
  lemon: number;
  potato: number;
  rice: number;
  ketchup: number;
  lettuce: number;
  onion: number;
  cheese: number;
  meat: number;
  chicken: number;
};

type Ingredient = {
  ingredientName: string;
  ingredientQty: number;
};

const Winery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(`${foodStorageServiceUrl}/ingredients`);
        const data: FoodStorageRes = await res.json();

        setIngredients([
          { ingredientName: "tomato", ingredientQty: data.tomato },
          { ingredientName: "lemon", ingredientQty: data.lemon },
          { ingredientName: "potato", ingredientQty: data.potato },
          { ingredientName: "rice", ingredientQty: data.rice },
          { ingredientName: "ketchup", ingredientQty: data.ketchup },
          { ingredientName: "lettuce", ingredientQty: data.lettuce },
          { ingredientName: "onion", ingredientQty: data.onion },
          { ingredientName: "cheese", ingredientQty: data.cheese },
          { ingredientName: "meat", ingredientQty: data.meat },
          { ingredientName: "chicken", ingredientQty: data.chicken },
        ]);

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    getIngredients();

    return () => {
      setIngredients([]);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="winery">
          <IngredientsList ingredients={ingredients} />
        </div>
      )}
    </>
  );
};

export default Winery;
