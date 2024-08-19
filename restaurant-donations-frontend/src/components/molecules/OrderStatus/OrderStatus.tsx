import Text from "../../atoms/Text/Text";
import "./style.css";

type AvailableStatus = "Under preparation" | "Completed";

type Props = {
  status: AvailableStatus;
};

const OrderStatus = ({ status }: Props) => {
  return (
    <div
      className={`order-status ${
        status === "Completed"
          ? "order-status--completed"
          : "order-status--preparation"
      }`}
    >
      <Text text={status} isUnderlined={false} />
    </div>
  );
};

export default OrderStatus;
