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
  const [subStringOne, setSubStringOne] = useState<string | null>("");
  const [subStringTwo, setSubStringTwo] = useState<string | null>("");
  const [subStringThree, setSubStringThree] = useState<string | null>("");
  useEffect(() => {
    const fetchAdvice = async () => {
      if (localStorage.getItem("advice")) {
        setAdviceAI(localStorage.getItem("advice"));
        return;
      }
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

      console.log("historical", historicData);

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
      console.log(
        "ai data",
        JSON.stringify({
          historicData: refinedHistorical,
          budgetData: budgets,
          expenseData: expenses,
        })
      );

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
    if (user) {
      fetchAdvice();
    }
  }, [user]);

  useEffect(() => {
    let pointOne = adviceAI?.indexOf("1.");
    console.log("pointOne", pointOne);
    let pointTwo = adviceAI?.indexOf("2.");
    let pointThree = adviceAI?.indexOf("3.");

    console.log("subtringOne", adviceAI?.substring(pointOne, pointTwo));
    console.log("subtringTwo", adviceAI?.substring(pointTwo, pointThree));
    console.log(
      "subtringThree",
      adviceAI?.substring(pointThree, adviceAI?.length)
    );
    setSubStringOne(adviceAI?.substring(pointOne, pointTwo));
    setSubStringTwo(adviceAI?.substring(pointTwo, pointThree));
    setSubStringThree(adviceAI?.substring(pointThree, adviceAI?.length));
  }, [adviceAI]);

  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && (
          <div className="flex px-4 sm:px-24 mb-24 flex-col mt-6 gap-6 items-center">
            <button className="btn btn-accent text-lg btn-md mt-2">
              Update Advice
            </button>{" "}
            <p className="text-xl font-bold">AI advisor</p>
            {adviceAI && (
              <>
                {" "}
                <div className="flex flex-col gap-10">
                  <p className="text-lg">{subStringOne}</p>
                  <p className="text-lg">{subStringTwo}</p>
                  <p className="text-lg">{subStringThree}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AI_advice;
