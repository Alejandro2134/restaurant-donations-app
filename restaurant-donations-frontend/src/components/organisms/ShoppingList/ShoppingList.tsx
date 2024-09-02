import "./style.css";
import Text from "../../atoms/Text/Text";

type Purchases = { name: string; amount: number };
type Props = {
  shoppingList: Purchases[];
};

const ShoppingList = ({ shoppingList }: Props) => {
  return (
    <div className="shopping-list-container">
      <table>
        <thead>
          <tr>
            <th>
              <Text isUnderlined={false} text="Name" />
            </th>
            <th>
              <Text isUnderlined={false} text="Amount" />
            </th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.map((purchase, index) => (
            <tr key={index}>
              <td>
                <Text isUnderlined={false} text={purchase.name} />
              </td>
              <td>
                <Text isUnderlined={false} text={`${purchase.amount}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingList;
