import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

const TotalBudget = () => {
  const { budgets, expenses, dispatch } = useContext(BudgetsContext);
  const { user } = useContext(AuthContext);
  let budget_total = 0;
  let expense_total = 0;

  let barDisplay;

  if (budgets && budgets.length > 0) {
    budget_total = budgets.reduce((total, budget) => {
      return total + budget.amount;
    }, 0);
  }

  if (expenses) {
    expense_total = expenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }

  if (
    budget_total / expense_total <= 1.33333 &&
    budget_total / expense_total >= 1
  ) {
    barDisplay = "progress progress-warning w-full h-3.5";
  } else if (budget_total > expense_total) {
    barDisplay = "progress progress-primary w-full h-3.5";
  } else {
    barDisplay = "progress progress-error w-full h-3.5";
  }

  return (
    <>
      {user && (
        <div className="bg-white shadow-2xl border-2 border-black p-4 flex flex-col gap-y-6 ">
          <div className="flex justify-between">
            <p className="text-xl">{format(new Date(), "MMMM")} Total</p>
            <p className="text-xl">
              ${expense_total} / ${budget_total}
            </p>
          </div>
          <div>
            <progress
              className={barDisplay}
              value={expense_total}
              max={budget_total}
            ></progress>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalBudget;
