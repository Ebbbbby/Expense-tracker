import React, { useState } from "react";
import "./style.css";
import { ITrackerItem } from "../../interfaces/Tracker";
import { IExpenseInformation } from "../../interfaces/Tracker";
import { ExpenseInformationList } from "../trackerList/InformationList";
import TotalAmount from "../totalAmount/TotalAmount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Actions = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [Totalexpenses, setTotalExpenses] = useState<number>(0);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [trackerItems, setTrackerItems] = useState<ITrackerItem[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [newBudget, setNewBudget] = useState<number | null>(null);
  const [newExpenses, setNewExpenses] = useState<number | null>(null);

  const handleExpenses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExpense = parseInt(e.target.value);
    setNewExpenses(newExpense);
  };
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBudget(Number(e.target.value));
  };
  const handleSelectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setTotalExpenses(null);
  };

  const addExpenseItems = () => {
    if (newExpenses && inputValue) {
      const newId = crypto.randomUUID();
      const currentDate = new Date().toISOString();
      const newExpenseInfo: IExpenseInformation = {
        id: newId,
        expenses: newExpenses ? newExpenses : 0,
        selectedValue,
        inputValue,
        date: currentDate,
      };
      setTrackerItems([
        ...trackerItems,
        { itemType: "expenses", itemData: newExpenseInfo },
      ]);
      setTotalExpenses((prev) => prev + newExpenses!);

      setNewExpenses(null);
      setInputValue("");
      setShowTable(true);
      setSelectedValue("");
      toast.success("Expense added successfully!");
    } else {
      toast.error("Please fill all the fields!", {
        position: "top-center",
      });
    }
  };

  const addBudget = () => {
    if (!newBudget) {
      toast.error("Please enter budget amount");
    } else {
      setTotalBudget((prevBudget) => prevBudget + newBudget!);
      setNewBudget(null);
      toast.success("Budget added successfully!", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="actions-wrapper">
          <div className="inputlist__container">
            <label htmlFor="type">Select Type:</label>
            <select
              name="type"
              value={selectedValue}
              onChange={handleSelectedValue}
              className="custom-dropdown"
            >
              <option value="">--Please choose an option--</option>
              <option value="Budget">Budget</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>
          {selectedValue === "Budget" ? (
            <div className="inputsearch__container">
              <input
                type="number"
                placeholder="Enter budget Amount"
                value={newBudget !== null ? newBudget : ""}
                onChange={handleBudget}
              />
              <button type="submit" onClick={addBudget}>
                Add
              </button>
              <ToastContainer />
            </div>
          ) : selectedValue === "Expenses" ? (
            < div >
              <fieldset className="set__border">
                <legend>Input Expense Detail</legend>
                <div className="expenses__container">
                  <input
                    type="number"
                    placeholder="Enter expense amount"
                    value={newExpenses !== null ? newExpenses : ""}
                    onChange={handleExpenses}
                  />
                  {/* <div className="text"> */}
                  <input
                    type="text"
                    placeholder="Enter Expense"
                    value={inputValue}
                    onChange={handleInputValue}
                  />
                  <button
                    type="submit"
                    onClick={addExpenseItems}
                    className="exp__btn"
                  >
                    Add
                  </button>
                </div>
              </fieldset>
              <ToastContainer />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <TotalAmount budget={totalBudget} expenses={Totalexpenses!} />
      </div>

      <div>
        <ExpenseInformationList
          trackerItems={trackerItems}
          setTrackerItems={setTrackerItems}
          setShowTable={setShowTable}
          showTable={showTable}
        />
      </div>
    </>
  );
};

export default Actions;
