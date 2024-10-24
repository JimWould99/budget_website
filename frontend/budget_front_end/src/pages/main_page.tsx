import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth_context";
import Header from "../components/header";
import Budget_display from "../components/budget_display";
import Add_budget_modal from "../components/add_budget_modal";
const Main_page = () => {
  const [allBudgets, setAllBudgets] = useState();
  const { user, login, logout } = useContext(AuthContext);
  console.log(`token`, user);
  useEffect(() => {
    const fetchBudgets = async () => {
      const options = {
        method: "POST",
        /*body: JSON.stringify({
          user: `a8a98a7d-a157-4495-a70b-661b3eb73305`,
        }),*/
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/display_budgets`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        setAllBudgets(json);
      }
    };
    if (user) {
      fetchBudgets();
    }
  }, [user]);
  return (
    <>
      <Header></Header>

      {allBudgets && console.log("budgets", allBudgets.budgets)}

      <div className="flex  flex-col items-center mt-16 gap-y-6">
        <div className="flex justify-start gap-4 w-5/6">
          <button
            className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add budget
          </button>
          <button className="hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white">
            Add expense
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-10  w-5/6">
          {allBudgets &&
            allBudgets.budgets.map((budget) => (
              <Budget_display budget={budget}></Budget_display>
            ))}
        </div>
      </div>

      <Add_budget_modal></Add_budget_modal>
    </>
  );
};
export default Main_page;
