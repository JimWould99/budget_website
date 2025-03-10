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
import SetData from "../hooks/setData";
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
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && (
          <div className="flex flex-col items-center pt-10 gap-y-6 bg-base-100 w-full ">
            <div className="flex flex-col md:flex-row w-full px-4 sm:px-24 justify-between md:content-center md:items-center gap-4 ">
              <div className="flex flex-row justify-between md:justify-normal md:gap-4 ">
                <button
                  className="btn btn-secondary text-xl btn-lg shadow-lg"
                  onClick={() => addBudgetButton()}
                >
                  Add budget
                </button>
                <button
                  className="btn btn-secondary text-xl btn-lg shadow-lg"
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
            <div className="sm:px-24 px-4 sm:px-0 w-full">
              <TotalBudget></TotalBudget>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-10 sm:px-24 px-4 sm:px-0 w-full mb-10">
              {budgets &&
                budgets.length > 0 &&
                budgets.map((budget, index) => (
                  <Budget_display key={index} budget={budget}></Budget_display>
                ))}
            </div>
          </div>
        )}
        {!showContent && renderSidebar && (
          <div className="flex flex-col items-center justify-center w-full ">
            <button
              onClick={() => {
                setSideBarShown(false);
              }}
              className="btn bg-gray-400 text-3xl"
            >
              X
            </button>
          </div>
        )}
      </div>
      <Add_budget_modal></Add_budget_modal>
    </>
  );
};
export default Main_page;
