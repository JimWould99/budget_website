import { useEffect, useState } from "react";

const Main_page = () => {
  const [allBudgets, setAllBudgets] = useState(null);
  useEffect(() => {
    const fetchBudgets = async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          user: `a8a98a7d-a157-4495-a70b-661b3eb73305`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:3005/display_budgets`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        setAllBudgets(json);
      }
    };
    fetchBudgets();
  }, []);
  return (
    <>
      <p>test first page</p>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {console.log(allBudgets)}
    </>
  );
};

export default Main_page;
