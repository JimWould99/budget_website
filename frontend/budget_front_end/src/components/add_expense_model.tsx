import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth_context";
import { BudgetsContext } from "../context/budgets_context";

interface Budget {
  amount: number;
  createdAt: string;
  id: string;
  name: string;
  userId: string;
}

const Add_expense_model = ({ budgetSelected }: { budgetSelected: Budget }) => {
  const { user } = useContext(AuthContext);
  const budgetsContext = useContext(BudgetsContext);
  const dispatch = budgetsContext?.dispatch;
  const budgets = budgetsContext?.budgets;

  const [errorColor, setErrorColor] = useState<string>("text-white");
  // const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [budgetCat, setBudgetCat] = useState<string>(budgetSelected.id);
  const [recurring, setRecurring] = useState<boolean>(false);

  useEffect(() => {
    setBudgetCat(budgetSelected.id);
  }, [budgetSelected]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "" || amount === "" || budgetCat === "") {
      setErrorColor("text-red-500");
      return;
    }

    const request_details = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        amount,
        budgetId: budgetCat,
        recurring,
      }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/add_expense`,
      request_details
    );
    const json = await response.json();

    if (!response.ok) {
      // setLoading(false);
      //setError(json.error);
    }

    if (response.ok) {
      setName("");
      setAmount("");
      setRecurring(false);
      setBudgetCat(budgetSelected.id);
      //addNewExpense(json);
      if (dispatch) {
        dispatch({ type: "addNewExpense", payload: json });
      }
      const dialog = document.getElementById(expense_id);
      if (dialog) {
        (dialog as HTMLDialogElement).close();
      }
    }
  };

  const expense_id = `${budgetSelected.id}:expense`;

  return (
    <>
      <dialog id={expense_id} className="modal">
        <div className="modal-box">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <p className="text-2xl">New Expense</p>
            <div className="w-full">
              <p>Expense name</p>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-black h-10 w-full pl-4"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <p>Amount</p>
              <input
                type="number"
                name="amount"
                id="amount"
                className="border border-black h-10 w-full pl-4"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <div>
              <p>Budget</p>
              <select
                className="border border-black h-10 w-full"
                name="budget"
                id="budget"
                onChange={(e) => setBudgetCat(e.target.value)}
                value={budgetCat}
              >
                {budgets &&
                  budgets.map((budget) => (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center gap-10">
              <input
                type="checkbox"
                className="toggle toggle-info"
                checked={recurring}
                onChange={(e) => {
                  setRecurring(e.target.checked);
                }}
              />
              {!recurring && <p>Non-recurring expense (reset each month)</p>}
              {recurring && <p>Recurring expense </p>}
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded text-nowrap hover:bg-white hover:text-black hover:drop-shadow-2xl w-1/3"
            >
              Add expense
            </button>
            <p className={errorColor}>Please fill all categories</p>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setErrorColor(" text-white")}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Add_expense_model;
