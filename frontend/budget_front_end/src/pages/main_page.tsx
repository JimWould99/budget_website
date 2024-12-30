import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../context/auth_context";
import { BudgetsContext } from "../context/budgets_context";
import Header from "../components/header";
import Budget_display from "../components/budget_display";
import Add_budget_modal from "../components/add_budget_modal";
import Add_expense_model from "../components/add_expense_model";
import TotalBudget from "../components/total";
const Main_page = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { budgets, expenses, dispatch } = useContext(BudgetsContext);
  //console.log("budgets context", budgets);
  const [noAccount, setNoAccount] = useState<boolean>(false);
  useEffect(() => {
    const fetchBudgets = async () => {
      const options = {
        method: "POST",
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
      //console.log("budgets json", json.budgets);
      if (response.ok) {
        dispatch({ type: "setBudgets", payload: json.budgets });
      }
    };
    if (user) {
      fetchBudgets();
    }
    console.log("render");
  }, [user, dispatch]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/display_all_expenses`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "setExpenses", payload: json.mssg });
      }
    };
    if (user) {
      fetchExpenses();
    }
    console.log("fetch");
  }, [user, dispatch]);
  const addBudgetButton = () => {
    if (!user) {
      setNoAccount(true);
      return;
    }
    setNoAccount(false);
    document.getElementById("my_modal_2").showModal();
  };
  const addExpenseButton = () => {
    if (!user) {
      setNoAccount(true);
      return;
    }
    if (budgets.length === 0) {
    }
    setNoAccount(false);
    document.getElementById(`${budgets[0].id}:expense`).showModal();
  };
  const day = format(new Date(), "do 'of' MMMM");

  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center pt-10 gap-y-6 bg-violet-100 min-h-[100vh]">
        <div className="flex flex-col md:flex-row w-5/6 justify-between md:content-center md:items-center gap-4 ">
          <div className="flex flex-row justify-between md:justify-normal md:gap-4 ">
            <button
              className="bg-white shadow-2xl hover:bg-blue-900  hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
              onClick={() => addBudgetButton()}
            >
              Add budget
            </button>
            <button
              className="bg-white shadow-xl hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white"
              onClick={() => {
                addExpenseButton();
              }}
            >
              Add expense
            </button>
          </div>
          {noAccount && (
            <p className="text-xl text-red-600">
              Please login or create an account
            </p>
          )}
          {user && <p className="text-xl">{day}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-10 w-5/6">
          {budgets &&
            budgets.length > 0 &&
            budgets.map((budget, index) => (
              <Budget_display key={index} budget={budget}></Budget_display>
            ))}
        </div>
        <div className="w-5/6 mb-10">
          <TotalBudget></TotalBudget>
        </div>
      </div>
      <Add_budget_modal></Add_budget_modal>
    </>
  );
};
export default Main_page;
