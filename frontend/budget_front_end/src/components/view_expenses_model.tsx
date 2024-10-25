import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext } from "react";

const View_expenses_model = ({ budget }) => {
  const { displayExpenses } = useContext(BudgetsContext);
  const expenses = displayExpenses(budget.id);
  console.log("expenses", budget.name, expenses);
  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <p className="text-2xl font-semibold mb-6">{budget.name} expenses</p>
          {expenses &&
            expenses.map((expense) => (
              <div className="flex justify-between">
                <p className="text-xl ">{expense.name}</p>
                <p className="text-xl">$ {expense.amount}</p>
              </div>
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
