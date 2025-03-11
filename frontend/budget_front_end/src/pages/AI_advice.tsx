import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebar_context";
import { AuthContext } from "../context/auth_context";
import { set } from "date-fns";
import { se } from "date-fns/locale";

interface refinedHistorical {
  createdAt: string;
  amountSpent: number;
  amountBudgeted: number;
}

interface historicData {
  amountBudgeted: number;
  amountSpent: number;
  createdAt: string;
  id: string;
  userId: string;
}

const AI_advice = () => {
  const { user } = useContext(AuthContext);
  const { setSideBarShown, renderSidebar, showContent } =
    useContext(SidebarContext);
  const [adviceAI, setAdviceAI] = useState<string | null>("");
  const [subStringOne, setSubStringOne] = useState<any>("");
  const [subStringTwo, setSubStringTwo] = useState<any>("");
  const [subStringThree, setSubStringThree] = useState<any>("");

  const [displayMax, setDisplayMax] = useState<string | null>(null);

  const checkTime = () => {
    console.log("check time");
    const timePeriod = 1000 * 60 * 60 * 24;
    const currentTime = new Date().getTime();

    let lastTime = parseInt(localStorage.getItem("lastTime") || "0");
    console.log("last time", lastTime);
    const reqCounterStorage = parseInt(
      localStorage.getItem("reqCounter") || "0"
    );

    if (!lastTime) {
      localStorage.setItem("lastTime", currentTime.toString());
      lastTime = parseInt(currentTime.toString());
    }
    if (!reqCounterStorage) {
      localStorage.setItem("reqCounter", "0");
    }

    if (lastTime - currentTime > timePeriod) {
      console.log("time smaller", lastTime - currentTime);
      localStorage.setItem("lastTime", currentTime.toString());
      localStorage.setItem("reqCounter", "0");
    } else {
      console.log("not resetting");
      localStorage.setItem("reqCounter", (reqCounterStorage + 1).toString());
    }
  };

  const fetchAdvice = async () => {
    checkTime();
    const reqCounter = localStorage.getItem("reqCounter");
    if (reqCounter && parseInt(reqCounter) > 4) {
      console.log("max reached");
      setDisplayMax(
        "Maximum of three advice requests per day. Please try again later."
      );
      return;
    }
    setAdviceAI(null);
    const historicData = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/display_historic`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return;
      });

    const refinedHistorical: refinedHistorical[] = [];

    historicData.forEach((object: historicData) => {
      const holder: refinedHistorical = {
        createdAt: "",
        amountSpent: 0,
        amountBudgeted: 0,
      };
      holder.createdAt = object.createdAt;
      holder.amountBudgeted = object.amountBudgeted;
      holder.amountSpent = object.amountSpent;
      refinedHistorical.push(holder);
    });

    const budgets = localStorage.getItem("budgets");
    const expenses = localStorage.getItem("expenses");

    const options = {
      method: "POST",
      body: JSON.stringify({
        historicData: refinedHistorical,
        budgetData: budgets,
        expenseData: expenses,
      }),
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    const advice = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/display_advice`,
      options
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return;
      });
    setAdviceAI(advice.content);
    localStorage.setItem("advice", advice.content);
  };

  useEffect(() => {
    if (localStorage.getItem("advice")) {
      setAdviceAI(localStorage.getItem("advice"));
      return;
    }
    if (user) {
      fetchAdvice();
    }
  }, [user]);

  useEffect(() => {
    const pointOne: any = adviceAI?.indexOf("1.");
    const pointTwo: any = adviceAI?.indexOf("2.");
    const pointThree: any = adviceAI?.indexOf("3.");

    setSubStringOne(adviceAI?.substring(pointOne, pointTwo));
    setSubStringTwo(adviceAI?.substring(pointTwo, pointThree));
    setSubStringThree(adviceAI?.substring(pointThree, adviceAI?.length));
  }, [adviceAI]);

  const resetAdvice = () => {
    fetchAdvice();
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && (
          <div className="flex px-6 sm:px-24 mb-24 flex-col mt-6 gap-6 items-center">
            {adviceAI && (
              <>
                <p className="text-red-700 text-xl font-bold">{displayMax}</p>

                <button
                  onClick={() => {
                    resetAdvice();
                  }}
                  className="btn btn-accent text-lg btn-md mt-2"
                >
                  Update Advice
                </button>
                <p className="text-xl font-bold">AI advisor</p>
                <>
                  {" "}
                  <div className="flex flex-col gap-10">
                    <p className="text-lg">{subStringOne}</p>
                    <p className="text-lg">{subStringTwo}</p>
                    <p className="text-lg">{subStringThree}</p>
                  </div>
                </>
              </>
            )}
            {!adviceAI && user && (
              <>
                <p className="text-2xl">Advice loading...</p>
              </>
            )}
            {!user && (
              <>
                <p className="text-2xl">Create account or login for advice</p>
              </>
            )}
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
    </>
  );
};

export default AI_advice;
