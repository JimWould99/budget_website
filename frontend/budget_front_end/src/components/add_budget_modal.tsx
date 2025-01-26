import { useState, useContext } from "react";
import { AuthContext } from "../context/auth_context";
import { BudgetsContext } from "../context/budgets_context";

const Add_budget_modal = () => {
  const { user } = useContext(AuthContext);
  const budgetsContext = useContext(BudgetsContext);
  const dispatch = budgetsContext ? budgetsContext.dispatch : () => {};

  const [errorColor, setErrorColor] = useState<string>("mt-2 text-white");
  //const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "" || amount === "") {
      setErrorColor("mt-2 text-red-500");
      return;
    }

    const request_details = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/add_budget`,
      request_details
    );
    const json = await response.json();

    console.log("budget json", json);
    if (!response.ok) {
      //setLoading(false);
      //   setError(json.error);
    }

    if (response.ok) {
      setName("");
      setAmount("");
      dispatch({ type: "addNewBudget", payload: json.mssg });
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    }
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <p className="text-2xl">New budget</p>
            <div className="w-full">
              <p>Name</p>
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
              <p>Maximum spend ($)</p>
              <input
                type="number"
                name="amount"
                id="amount"
                className="border border-black h-10 w-full pl-4"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded text-nowrap hover:bg-white hover:text-black hover:drop-shadow-2xl w-1/3"
            >
              Add budget
            </button>
          </form>
          <p className={errorColor}>Please fill all categories</p>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setErrorColor("mt-2 text-white")}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
};

export default Add_budget_modal;
