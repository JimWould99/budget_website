import Add_expense_model from "./add_expense_model";
import View_expenses_model from "./view_expenses_model";
import { BudgetsContext } from "../context/budgets_context";
import { useContext } from "react";
import { formatRelative } from "date-fns";
import ConfirmDelete from "./confirm_delete";

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

const Budget_display = ({ budget }: { budget: Budget }) => {
  const name = budget.name;
  const amount = budget.amount;
  let expense_amount = 0;
  let specificExpenses: Expense[] = [];
  //const [expense_amount, setExpense_amount] = useState<number>(0);
  let barDisplay;

  const context = useContext(BudgetsContext);
  const expenses = context ? context.expenses : [];

  if (expenses) {
    specificExpenses = expenses.filter(
      (expense) => expense.budgetId === budget.id
    );

    expense_amount = specificExpenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }

  if (amount / expense_amount <= 1.33333 && amount / expense_amount >= 1) {
    barDisplay = "progress progress-primary bg-gray-400 w-full h-3.5";
  } else if (amount > expense_amount) {
    barDisplay = "progress progress-accent w-full h-3.5 bg-gray-400";
  } else {
    barDisplay = "progress progress-error w-full h-3.5 bg-gray-400";
  }

  function expenseClick() {
    const expenseModal = document.getElementById(`${budget.id}:expense`);
    if (expenseModal) {
      (expenseModal as HTMLDialogElement).showModal();
    }
  }

  function budgetClick() {
    const budgetModal = document.getElementById(budget.id);
    if (budgetModal) {
      (budgetModal as HTMLDialogElement).showModal();
    }
  }

  function deleteBudget() {
    const budgetDeleteModel = document.getElementById(`${budget.id}:delete`);
    if (budgetDeleteModel) {
      (budgetDeleteModel as HTMLDialogElement).showModal();
    }
  }

  return (
    <>
      <div className="bg-white rounded-md shadow-2xl border-2 border-primary p-4 flex flex-col gap-y-6">
        <div className="flex justify-between">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-xl">{name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6  text-red-500 hover:cursor-pointer"
              onClick={() => {
                deleteBudget();
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
          {budget.id.slice(0, 7) !== "default" ? (
            <p>{formatRelative(budget.createdAt, new Date())}</p>
          ) : (
            <p>Default budget</p>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => expenseClick()}
            className="btn btn-neutral btn-md shadow-lg"
          >
            Add expense
          </button>
          <button
            onClick={() => budgetClick()}
            className="btn btn-neutral btn-md shadow-lg"
          >
            View expenses
          </button>
        </div>
        <Add_expense_model budgetSelected={budget}></Add_expense_model>
        <View_expenses_model
          budget={budget}
          specificExpenses={specificExpenses}
        ></View_expenses_model>
        <ConfirmDelete budget={budget}></ConfirmDelete>
      </div>
    </>
  );
};
export default Budget_display;
