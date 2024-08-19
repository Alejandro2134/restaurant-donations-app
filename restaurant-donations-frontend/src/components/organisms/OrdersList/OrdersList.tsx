import Text from "../../atoms/Text/Text";
import OrderStatus from "../../molecules/OrderStatus/OrderStatus";
import "./style.css";

type AvailableStatus = "Under preparation" | "Completed";
type Order = { status: AvailableStatus; name: string; order_id: string };

type Props = {
  orders: Order[];
};

const OrdersList = ({ orders }: Props) => {
  return (
    <div className="orders-list-container">
      <table>
        <thead>
          <tr>
            <th>
              <Text isUnderlined={false} text="Name" />
            </th>
            <th>
              <Text isUnderlined={false} text="Status" />
            </th>
            <th>
              <Text isUnderlined={false} text="Order ID" />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <Text isUnderlined={false} text={order.name} />
              </td>
              <td>
                <OrderStatus status={order.status} />
              </td>
              <td>
                <Text isUnderlined={false} text={`${order.order_id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
