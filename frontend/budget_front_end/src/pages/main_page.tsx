import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../context/auth_context";
import { BudgetsContext } from "../context/budgets_context";
import { SidebarContext } from "../context/sidebar_context";
import Header from "../components/header";
import Budget_display from "../components/budget_display";
import Add_budget_modal from "../components/add_budget_modal";
import TotalBudget from "../components/total";
import Sidebar from "../components/sidebar";
//import useScreenWidth from "../hooks/useScreenWidth";

const Main_page = () => {
  const { user, logout } = useContext(AuthContext);
  const budgetsContext = useContext(BudgetsContext);
  const { setSideBarShown, renderSidebar, showContent } =
    useContext(SidebarContext);
  const budgets = budgetsContext?.budgets;
  const dispatch = budgetsContext?.dispatch;
  const [noAccount, setNoAccount] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchBudgets = async () => {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      };
      const [budgets_json, expenses_json] = await Promise.all([
        fetch(`${import.meta.env.VITE_REACT_APP_URL}/display_budgets`, options)
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
            return;
          }),
        fetch(
          `${import.meta.env.VITE_REACT_APP_URL}/display_all_expenses`,
          options
        )
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
            return;
          }),
      ]);

      if (budgets_json.error) {
        console.log("expired");
        logout();
        return;
      }

      if (budgets_json && expenses_json) {
        if (dispatch) {
          dispatch({ type: "setBudgets", payload: budgets_json.budgets });
          dispatch({ type: "setExpenses", payload: expenses_json.mssg });
        }
      }
    };
    if (user) {
      fetchBudgets();
    }
  }, [user, dispatch]);

  const addBudgetButton = () => {
    if (!user) {
      setNoAccount(true);
      return;
    }
    setNoAccount(false);
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };
  const addExpenseButton = () => {
    if (!user) {
      setNoAccount(true);
      return;
    }
    /*if (budgets?.length === 0) {
    }*/
    setNoAccount(false);
    if (budgets && budgets.length > 0) {
      const modal = document.getElementById(`${budgets[0].id}:expense`);
      if (modal) {
        (modal as HTMLDialogElement).showModal();
      }
    }
  };
  const day = format(new Date(), "do 'of' MMMM");

  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {!user && (
          <div className="sm:h-[70vh] h-[50vh] sm:mt-0 mt-12 w-full flex items-center justify-center">
            <div className="border-solid border-2 border-blue-300 px-4 sm:px-14 sm:py-10 flex flex-col items-center justify-center gap-y-10 rounded-xl w-[90vw] h-[60vh] lg:h-[40vh]  md:w-[60vw] text-center">
              <p className="text-3xl ">Sign up or login for better budgets.</p>
              <p className="text-3xl ">
                BetterBudgetsAI helps you to keep track of your spending. And
                gives AI insights on how to manage your money better.
              </p>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-col items-center pt-10 gap-y-6 bg-base-100 w-full ">
            <div className="flex flex-col md:flex-row w-full px-4 sm:px-10 justify-between md:content-center md:items-center gap-4 ">
              <p className="text-xl">{user.email}</p>

              {user && <p className="text-xl">{day}</p>}
            </div>
            <div className="sm:px-10 px-4 sm:px-0 w-full">
              <TotalBudget></TotalBudget>
            </div>
            <div className="grid auto-rows-[1fr] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-10 sm:px-10 px-4 sm:px-0 w-full mb-10">
              {budgets &&
                budgets.length > 0 &&
                budgets.map((budget, index) => (
                  <Budget_display key={index} budget={budget}></Budget_display>
                ))}
              <div
                onClick={() => addBudgetButton()}
                className="bg-white rounded-md items-center cursor-pointer justify-center shadow-2xl border-2 border-gray-400 p-4 flex flex-col gap-y-6"
              >
                <div className="flex justify-center items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={4}
                    stroke="currentColor"
                    className="size-20"
                    color="#99a1af"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="text-3xl mb-2 text-gray-400 font-semibold">
                    New Budget
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Add_budget_modal></Add_budget_modal>
    </>
  );
};
export default Main_page;
