import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext, useState, useCallback } from "react";
import useScreenWidth from "../hooks/useScreenWidth";
import ConfirmDelete from "./confirm_delete";

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

const Expense_strip = ({
  expense,
  budget,
}: {
  expense: Expense;
  budget: Budget;
}) => {
  const { user } = useContext(AuthContext);
  //const { updateExpense, deleteExpense } = useContext(BudgetsContext);
  const budgetsContext = useContext(BudgetsContext);
  if (!budgetsContext) {
    throw new Error("BudgetsContext is undefined");
  }
  const { dispatch } = budgetsContext;

  const [newAmount, setNewAmount] = useState<number>(expense.amount);
  const [recurring, setRecurring] = useState<boolean>(expense.recurring);

  const useWindowSize = useScreenWidth();
  //console.log("useWindowSize width", useWindowSize.width);

  const truncateText = ({ text }: { text: string }) => {
    if (text.length <= 14 || useWindowSize.width <= 640) {
      return <span className="text-xl">{text}</span>;
    } else {
      const truncatedText = `${text.slice(0, 14)}`;
      const extraText = text.slice(14, text.length);
      return (
        <div className="text-xl">
          {truncatedText} <span className=" group-hover:hidden">...</span>
          <span className="hidden group-hover:block bg-white group-hover:absolute group-hover:z-10">
            {extraText}
          </span>
        </div>
      );
    }
  };

  const editExpense = async (amount: number, newRecurring: boolean) => {
    if (amount === undefined) {
      setNewAmount(0);
    } else {
      setNewAmount(amount);
    }

    setRecurring(newRecurring);

    const { name, budgetId, id, createdAt } = expense;

    const request_details = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        newAmount: amount,
        budgetId,
        id,
        createdAt,
        recurring: newRecurring,
      }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/edit_expense`,
      request_details
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "updateExpense", payload: json });
      //updateExpense(json);
    }
  };

  function deleteExpenseClick() {
    const budgetDeleteModel = document.getElementById(`${expense.id}:delete`);
    if (budgetDeleteModel) {
      (budgetDeleteModel as HTMLDialogElement).showModal();
    }
    //(document.getElementById(`${budget.id}`) as HTMLDialogElement)?.close();
  }

  /*const deleteExpenseClick = async (expenseId: string) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expenseId }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/delete_expense`,
      options
    );
    if (response.ok) {
      dispatch({ type: "deleteExpense", payload: expenseId });
      //deleteExpense(expenseId);
    }
  };*/

  return (
    <>
      <div
        key={expense.id}
        className="group pb-1 grid border-b-2 border-gray-300 grid-cols-3 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1 items-center mb-3"
      >
        <p className="col-span-3 sm:col-span-1">
          {truncateText({ text: expense.name })}
        </p>
        <div className=" grid grid-cols-[100px_auto] w-[140px] gap-4 items-center col-start-1 sm:col-start-2 row-start-2 sm:row-start-1">
          <p className="text-nowrap  ">
            {recurring ? "Recurring" : "Non-recurring"}
          </p>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={recurring}
            onChange={(e) => {
              editExpense(newAmount, e.target.checked);
            }}
          />
        </div>
        <div className="flex gap-2 justify-end row-start-2 sm:row-start-1 col-start-3 ">
          <p className="text-xl">$</p>
          <input
            onChange={(e) => editExpense(Number(e.target.value), recurring)}
            className="text-xl w-2/5 cursor-pointer"
            type="number"
            value={newAmount}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-500 hover:cursor-pointer"
            onClick={() => {
              deleteExpenseClick();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              color="	#880808"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
      <ConfirmDelete expense={expense}></ConfirmDelete>
    </>
  );
};

export default Expense_strip;
