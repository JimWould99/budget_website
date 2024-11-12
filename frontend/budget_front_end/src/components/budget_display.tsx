import Add_expense_model from "./add_expense_model";
import View_expenses_model from "./view_expenses_model";
import { BudgetsContext } from "../context/budgets_context";
import { useContext, useEffect, useState } from "react";
import { formatRelative } from "date-fns";
const Budget_display = ({ budget }) => {
  const name = budget.name;
  const amount = budget.amount;
  let expense_amount;
  let specificExpenses;
  //const [expense_amount, setExpense_amount] = useState<number>(0);
  let barDisplay;

  const { dispatch, expenses } = useContext(BudgetsContext);

  if (expenses) {
    specificExpenses = expenses.filter(
      (expense) => expense.budgetId === budget.id
    );

    expense_amount = specificExpenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
    console.log(
      `specific expenses for ${budget.name}: ${JSON.stringify(
        specificExpenses
      )}`
    );
  }

  /*
  useEffect(() => {
    if (dispatch({ type: "displayExpenses", payload: budget.id })) {
      const expenses = dispatch({
        type: "displayExpenses",
        payload: budget.id,
      });
      const amount = expenses.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);
      setExpense_amount(amount);
    }
    console.log("test");
  }, [budget.id]); */

  if (amount / expense_amount <= 1.33333 && amount / expense_amount >= 1) {
    barDisplay = "progress progress-warning w-full h-3.5";
  } else if (amount > expense_amount) {
    barDisplay = "progress progress-primary w-full h-3.5";
  } else {
    barDisplay = "progress progress-error w-full h-3.5";
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
        <div>
          <progress
            className={barDisplay}
            value={expense_amount}
            max={amount}
          ></progress>
        </div>
        <div>
          <p>{formatRelative(budget.createdAt, new Date())}</p>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() =>
              document.getElementById(`${budget.id}:expense`).showModal()
            }
            className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
          >
            Add expense
          </button>
          <button
            onClick={() => document.getElementById(budget.id).showModal()}
            className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
          >
            View expenses
          </button>
        </div>
        <Add_expense_model budgetSelected={budget}></Add_expense_model>
        <View_expenses_model
          budget={budget}
          specificExpenses={specificExpenses}
        ></View_expenses_model>
      </div>
    </>
  );
};
export default Budget_display;
