import { useState } from "react";
import Button from "../../atoms/Button/Button";
import Text from "../../atoms/Text/Text";
import MenuSelect from "../../molecules/MenuSelect/MenuSelect";
import "./style.css";
import OrdersList from "../../organisms/OrdersList/OrdersList";
import Input from "../../atoms/Input/Input";

const kitchenServiceUrl =
  process.env.REACT_APP_KITCHEN_SERVICE_URL || "http://localhost:3001";

type Options = {
  name: string;
  isSelected: boolean;
};

const ordersListOptions: Options[] = [
  { name: "Under preparation", isSelected: false },
  { name: "Completed", isSelected: false },
  { name: "Order history", isSelected: true },
];

type Order = {
  status: "Completed" | "Under preparation";
  name: string;
  order_id: string;
};

type Props = {
  orders: Order[];
};

const Orders = ({ orders }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("Order history");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [options, setOptions] = useState<Options[]>(ordersListOptions);
  const [isBulkOrder, setIsBulkOrder] = useState<boolean>(false);
  const [orderAmount, setOrderAmount] = useState<number>(1);

  const selectOrders = (orders: Order[], selectedOption: string) => {
    const filter: { [orderType: string]: Order[] } = {
      "Under preparation": orders.filter(
        (order) => order.status === "Under preparation"
      ),
      Completed: orders.filter((order) => order.status === "Completed"),
      "Order history": orders,
    };

    return filter[selectedOption];
  };

  const activateBulkOrder = () => {
    setIsBulkOrder(true);
  };

  const deactivateBulkOrder = () => {
    setIsBulkOrder(false);
    setOrderAmount(1);
  };

  const onClick = async () => {
    try {
      setIsButtonDisabled(true);
      await fetch(`${kitchenServiceUrl}/orders`, {
        method: "POST",
        body: JSON.stringify({ amount: orderAmount }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsButtonDisabled(false);
    } catch {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="orders">
      <div className="place-orders">
        <Button
          text="Place Order"
          onClick={onClick}
          isDisabled={isButtonDisabled}
        />
        {isBulkOrder ? (
          <div className="place-single-order">
            <Input min={2} max={1000} setExternal={setOrderAmount} />
            <div className="place-bulk-order" onClick={deactivateBulkOrder}>
              <Text text="Go back to single order" isUnderlined={true} />
            </div>
          </div>
        ) : (
          <div className="place-bulk-order" onClick={activateBulkOrder}>
            <Text
              text="Would you like to place a bulk order?"
              isUnderlined={true}
            />
          </div>
        )}
      </div>

      <div className="orders-list">
        <MenuSelect
          options={options}
          onSelect={setSelectedOption}
          setOptions={setOptions}
        />
        <OrdersList orders={selectOrders(orders, selectedOption)} />
      </div>
    </div>
  );
};

export default Orders;
