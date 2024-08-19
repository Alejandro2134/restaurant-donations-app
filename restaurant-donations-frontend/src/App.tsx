import { useEffect, useState } from "react";
import "./App.css";
import MainLayout from "./components/templates/MainLayout/MainLayout";
import { socket } from "./socket";
import MenuSelect from "./components/molecules/MenuSelect/MenuSelect";
import Orders from "./components/pages/Orders/Orders";
import Winery from "./components/pages/Winery/Winery";
import Recipes from "./components/pages/Recipes/Recipes";

type Options = {
  name: string;
  isSelected: boolean;
};

const contentListOptions: Options[] = [
  { name: "Orders", isSelected: true },
  { name: "Recipes", isSelected: false },
  { name: "Winery", isSelected: false },
];

const availableRecipes = [
  {
    recipeName: "Tomato Soup",
    ingredients: [
      {
        ingredientName: "tomato",
        ingredientQty: 4,
      },
      {
        ingredientName: "onion",
        ingredientQty: 2,
      },
      {
        ingredientName: "potato",
        ingredientQty: 2,
      },
    ],
  },
  {
    recipeName: "Rice with chicken",
    ingredients: [
      {
        ingredientName: "rice",
        ingredientQty: 2,
      },
      {
        ingredientName: "chicken",
        ingredientQty: 1,
      },
      {
        ingredientName: "ketchup",
        ingredientQty: 1,
      },
    ],
  },
  {
    recipeName: "Hamburger",
    ingredients: [
      {
        ingredientName: "meat",
        ingredientQty: 1,
      },
      {
        ingredientName: "lettuce",
        ingredientQty: 1,
      },
      {
        ingredientName: "cheese",
        ingredientQty: 2,
      },
      {
        ingredientName: "ketchup",
        ingredientQty: 1,
      },
    ],
  },
  {
    recipeName: "Pizza",
    ingredients: [
      {
        ingredientName: "cheese",
        ingredientQty: 1,
      },
      {
        ingredientName: "tomato",
        ingredientQty: 1,
      },
    ],
  },
  {
    recipeName: "Acid Fries",
    ingredients: [
      {
        ingredientName: "potato",
        ingredientQty: 2,
      },
      {
        ingredientName: "lemon",
        ingredientQty: 1,
      },
    ],
  },
  {
    recipeName: "Salad",
    ingredients: [
      {
        ingredientName: "lemon",
        ingredientQty: 1,
      },
      {
        ingredientName: "lettuce",
        ingredientQty: 1,
      },
      {
        ingredientName: "tomato",
        ingredientQty: 1,
      },
    ],
  },
];

type OrderEventsPayload = {
  name: string;
  ingredients: { name: string; quantity: number }[];
  order_id: string;
};

type Order = {
  status: "Completed" | "Under preparation";
  name: string;
  order_id: string;
};

function App() {
  const [contentToRender, setContentToRender] = useState<string>("Orders");
  const [isConnected, setIsConnected] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [options, setOptions] = useState<Options[]>(contentListOptions);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("order:new", (payload: OrderEventsPayload) => {
      setOrders(
        orders.concat({
          status: "Under preparation",
          name: payload.name,
          order_id: payload.order_id,
        })
      );
    });
    socket.on("order:ready", (payload: OrderEventsPayload) => {
      setOrders(
        orders.concat({
          status: "Completed",
          name: payload.name,
          order_id: payload.order_id,
        })
      );
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  });

  return (
    <div className="app">
      <MainLayout>
        <MenuSelect
          options={options}
          onSelect={setContentToRender}
          setOptions={setOptions}
        />
        {contentToRender === "Orders" ? <Orders orders={orders} /> : null}
        {contentToRender === "Recipes" ? (
          <Recipes recipes={availableRecipes} />
        ) : null}
        {contentToRender === "Winery" ? <Winery /> : null}
      </MainLayout>
    </div>
  );
}

export default App;
