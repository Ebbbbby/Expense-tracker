import "../actions/style.css";
import { formatPrice } from "../../utils";
type Props = {
  budget: number;
  expenses: number;
};

const TotalAmount = (props: Props) => {
  return (
    <div>
      <div className="expense_balance">
        Available Balance <p> {formatPrice(props.budget - props.expenses)}</p>
      </div>
      <div className="expense_summary">
        <div>
          <h6>Budget</h6>
          <span style={{ color: "green" }}>{formatPrice(props.budget)}</span>
        </div>
        <div>
          <h6>Expenses</h6>
          <span style={{ color: "red" }}>{formatPrice(props.expenses)}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalAmount;
