import { ITrackerItem } from "../../interfaces/Tracker";
import './style.css'
import { formatDate, formatPrice } from "../../utils";


interface ExpenseInformationListProps {
  trackerItems: ITrackerItem[];
  setTrackerItems: React.Dispatch<React.SetStateAction<ITrackerItem[]>>;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
  showTable: boolean;
}

export const ExpenseInformationList: React.FC<ExpenseInformationListProps> = ({
  trackerItems,
  setTrackerItems,
  showTable
}) => {
  const handleDelete = (id: string) => {
    setTrackerItems(trackerItems.filter((item) => item.itemData.id !== id));
  };


  return (
    <div className="tracker_container">
      {showTable && (
        <table className="tracker_table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trackerItems.map((item) => (
              <tr key={item.itemData.id}>
                <td>{item.itemData.selectedValue}</td>
                <td>{formatPrice(item.itemData?.expenses)}</td>
                <td>{item?.itemData.inputValue} </td>
                <td>{formatDate(item.itemData.date)}</td>

                  <td>
                    <button onClick={() => handleDelete(item.itemData.id)} className="del__btn">
                      Delete
                    </button>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
