import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext, useState } from "react";
import Expense_strip from "./expense_strip";
const View_expenses_model = ({ budget, specificExpenses }) => {
  const { dispatch } = useContext(BudgetsContext);

  const { user } = useContext(AuthContext);
  //const expenses = dispatch({ type: "displayExpenses", payload: budget.id });
  const deleteBudgetClick = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetId: budget.id }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/delete_budget`,
      options
    );
    if (response.ok) {
      dispatch({ type: "deleteBudget", payload: budget.id });
    }
  };

  console.log("specific expenses", specificExpenses);

  return (
    <>
      <dialog id={budget.id} className="modal">
        <div className="modal-box">
          <div className="flex mb-5 items-center justify-between">
            <p className="text-2xl font-semibold">{budget.name} expenses</p>
            <p
              className="border-solid border-2 border-red-500 p-2 text-red-700 hover:cursor-pointer"
              onClick={() => {
                deleteBudgetClick();
              }}
            >
              Delete Budget
            </p>
          </div>
          {specificExpenses &&
            specificExpenses
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((expense) => (
                <Expense_strip
                  key={expense.id}
                  expense={expense}
                ></Expense_strip>
              ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default View_expenses_model;
