import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth_context";
import { BudgetsContext } from "../context/budgets_context";
import { json } from "react-router-dom";

const Add_expense_model = ({ budgetSelected }) => {
  const { user, login, logout } = useContext(AuthContext);
  const { budgets, expenses, addNewExpense } = useContext(BudgetsContext);
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [budgetCat, setBudgetCat] = useState<string>(budgetSelected.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request_details = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount, budgetId: budgetCat }),
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/add_expense`,
      request_details
    );
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setName("");
      setAmount("");
      setBudgetCat(budgetSelected.id);
      addNewExpense(json);
    }
  };

  const expense_id = `${budgetSelected.id}:expense`;

  return (
    <>
      <dialog id={expense_id} className="modal">
        <div className="modal-box">
          <form action="" onSubmit={handleSubmit}>
            <p className="text-2xl">New Expense</p>
            <div className="w-full">
              <p>Expense name</p>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-black h-10 w-full"
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
                className="border border-black h-10 w-full"
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
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded text-nowrap hover:bg-white hover:text-black hover:drop-shadow-2xl "
              onClick={() => document.getElementById(expense_id).close()}
            >
              Add budget
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Add_expense_model;
