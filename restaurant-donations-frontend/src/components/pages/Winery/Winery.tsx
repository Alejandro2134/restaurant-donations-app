import { useEffect, useState } from "react";
import IngredientsList from "../../organisms/IngredientsList/IngredientList";
import "./style.css";
import Loader from "../../atoms/Loader/Loader";
import Text from "../../atoms/Text/Text";
import ShoppingList from "../../organisms/ShoppingList/ShoppingList";
import Button from "../../atoms/Button/Button";

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

type Purchases = { name: string; amount: number };

const Winery = () => {
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [isLoadingShoppingList, setIsLoadingShoppingList] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [shoppingList, setShoppingList] = useState<Purchases[]>([]);

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

        setIsLoadingIngredients(false);
      } catch {
        setIsLoadingIngredients(false);
      }
    };

    const getShoppingList = async () => {
      try {
        const res = await fetch(`${foodStorageServiceUrl}/purchases`);
        const data: Purchases[] = await res.json();
        setShoppingList(data);
        setIsLoadingShoppingList(false);
      } catch {
        setIsLoadingShoppingList(false);
      }
    };

    getIngredients();
    getShoppingList();

    return () => {
      setIngredients([]);
      setShoppingList([]);
    };
  }, []);

  return (
    <div>
      {isLoadingIngredients ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className="winery">
          <Text isUnderlined={false} text="Ingredients" />
          <IngredientsList ingredients={ingredients} />
        </div>
      )}

      {isLoadingShoppingList ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className="shopping-list">
          <Text isUnderlined={false} text="Shopping List (Only the last 10)" />
          <ShoppingList shoppingList={shoppingList} />
        </div>
      )}
    </div>
  );
};

export default Winery;
