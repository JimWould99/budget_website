import Add_expense_model from "./add_expense_model";
import View_expenses_model from "./view_expenses_model";
import { BudgetsContext } from "../context/budgets_context";
import { useContext } from "react";
import { formatRelative } from "date-fns";

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
    barDisplay = "progress progress-warning w-full h-3.5";
  } else if (amount > expense_amount) {
    barDisplay = "progress progress-primary w-full h-3.5";
  } else {
    barDisplay = "progress progress-error w-full h-3.5";
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

  return (
    <>
      <div className="bg-white rounded-md shadow-2xl border-2 border-black p-4 flex flex-col gap-y-6">
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
          {budget.id.slice(0, 7) !== "default" ? (
            <p>{formatRelative(budget.createdAt, new Date())}</p>
          ) : (
            <p>Default budget</p>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => expenseClick()}
            className="btn btn-accent btn-md shadow-lg"
          >
            Add expense
          </button>
          <button
            onClick={() => budgetClick()}
            className="btn btn-accent btn-md shadow-lg"
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
