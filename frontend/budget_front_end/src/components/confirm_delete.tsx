import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";

import React, { useContext } from "react";
interface Budget {
  amount: number;
  createdAt: string;
  id: string;
  name: string;
  userId: string;
}

interface Expense {
  amount: number;
  budgetId: string;
  createdAt: string;
  id: string;
  name: string;
  recurring: boolean;
  userId: string;
}
type ConfirmDeleteProps =
  | { budget: Budget; expense: never }
  | { budget: Budget; expense: Expense };

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ budget, expense }) => {
  const budgetsContext = useContext(BudgetsContext);
  const { user } = useContext(AuthContext);

  if (!budgetsContext) {
    throw new Error("BudgetsContext is undefined");
  }
  const { dispatch } = budgetsContext;

  const deleteBudgetClick = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
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
    (
      document.getElementById(`${budget.id}:delete`) as HTMLDialogElement
    )?.close();
  };

  const deleteExpense = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expenseId: expense.id }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/delete_expense`,
      options
    );
    if (response.ok) {
      dispatch({ type: "deleteExpense", payload: expense.id });
      (
        document.getElementById(`${expense.id}:delete`) as HTMLDialogElement
      )?.close();
      //deleteExpense(expenseId);
    }
  };

  return (
    <dialog
      id={budget ? `${budget.id}:delete` : `${expense.id}:delete`}
      className="modal"
    >
      <div className="modal-box flex flex-col items-center justify-center gap-8">
        <p className="py-4 text-lg">{`Are you sure you want to delete ${
          budget ? `the ${budget.name} budget ` : `the ${expense.name} expense`
        }?`}</p>
        <button
          onClick={budget ? () => deleteBudgetClick() : () => deleteExpense()}
          className="btn w-full btn-md btn-error text-xl"
        >
          Delete
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ConfirmDelete;
