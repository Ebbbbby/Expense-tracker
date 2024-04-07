export interface IBugetInformation {
amount: number;
}
export interface IExpenseInformation {
  id: string;
  expenses: number;
  selectedValue: string;
  inputValue: string;
  date: string;

}
export interface ITrackerItem {
  itemType:  "expenses";
  itemData: IExpenseInformation;
}