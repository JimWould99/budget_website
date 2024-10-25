import Add_expense_model from "./add_expense_model";
import View_expenses_model from "./view_expenses_model";
import { BudgetsContext } from "../context/budgets_context";
import { useContext } from "react";
const Budget_display = ({ budget }) => {
  const name = budget.name;
  const amount = budget.amount;
  let expense_amount;

  const { displayExpenses } = useContext(BudgetsContext);
  if (displayExpenses(budget.id)) {
    const expenses = displayExpenses(budget.id);
    expense_amount = expenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }

  return (
    <>
      <div className="border-2 border-black p-4 flex flex-col gap-y-6">
        <div className="flex justify-between">
          <p className="text-xl">{name}</p>
          <p className="text-xl">
            ${expense_amount} / ${amount}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
          >
            Add expense
          </button>
          <button
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
          >
            View expenses
          </button>
        </div>
        <Add_expense_model></Add_expense_model>
        <View_expenses_model budget={budget}></View_expenses_model>
      </div>
    </>
  );
};

export default Budget_display;
