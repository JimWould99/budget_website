import { createContext, useEffect, useState, ReactNode } from "react";

type BudgetsContextProviderProps = {
  children: ReactNode;
};

export const BudgetsContext = createContext();

export const BudgetsContextProvider = ({
  children,
}: BudgetsContextProviderProps) => {
  const [budgets, setBudgets] = useState<object | null>(null);
  const [expenses, setExpenses] = useState<object | null>(null);

  function setBudgetsFunction(budgets: object) {
    setBudgets(budgets);
    console.log("budgets within context", budgets);
    return budgets;
  }

  function addNewBudget(budget: object) {
    setBudgets([...budgets, budget]);
  }
  return (
    <BudgetsContext.Provider
      value={{ budgets, expenses, setBudgetsFunction, addNewBudget }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
