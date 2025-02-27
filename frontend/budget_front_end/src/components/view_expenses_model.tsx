import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext, useEffect } from "react";
import Expense_strip from "./expense_strip";

interface Expense {
  amount: number;
  budgetId: string;
  createdAt: string;
  id: string;
  name: string;
  recurring: boolean;
  userId: string;
}

interface Budget {
  amount: number;
  createdAt: string;
  id: string;
  name: string;
  userId: string;
}

const View_expenses_model = ({
  budget,
  specificExpenses,
}: {
  budget: Budget;
  specificExpenses: Expense[];
}) => {
  const budgetsContext = useContext(BudgetsContext);
  if (!budgetsContext) {
    throw new Error("BudgetsContext is undefined");
  }
  const { dispatch } = budgetsContext;

  const { user } = useContext(AuthContext);
  //const expenses = dispatch({ type: "displayExpenses", payload: budget.id });
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
  };

  useEffect(() => {
    let data;
    if (dispatch) {
      data = dispatch({
        type: "displayExpenses",
        payload: "b4898d90-b49b-4f1a-97fc-d021310ffe13",
      });
    }
  }, [dispatch]);

  return (
    <>
      <dialog id={budget.id} className="modal">
        <div className="modal-box">
          <div className="flex mb-5 items-center justify-between">
            <p className="text-2xl font-semibold">{budget.name} expenses</p>
            <p
              className="btn btn-error text-white btn-sm"
              onClick={() => {
                deleteBudgetClick();
              }}
            >
              Delete Budget
            </p>
          </div>
          {specificExpenses &&
            specificExpenses
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
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
