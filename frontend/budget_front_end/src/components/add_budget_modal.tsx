import { useState, useContext } from "react";
import { AuthContext } from "../context/auth_context";

const Add_budget_modal = () => {
  const { user, login, logout } = useContext(AuthContext);

  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request_details = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/add_budget`,
      request_details
    );
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form action="" onSubmit={handleSubmit}>
            <p className="text-xl">New budget</p>
            <div className="w-full">
              <p>Name</p>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-black h-10 w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p>Maximum spend</p>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border border-black h-10 w-full"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded text-nowrap hover:bg-white hover:text-black hover:drop-shadow-2xl "
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

export default Add_budget_modal;
