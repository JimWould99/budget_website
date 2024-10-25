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

  function setExpensesFunction(expenses: object) {
    setExpenses(expenses);
    return expenses;
  }

  function addNewBudget(budget: object) {
    setBudgets((prevBudgets) => [...prevBudgets, budget.mssg]);
  }

  function addNewExpense(expense: object) {
    setExpenses([...expenses, expense]);
  }

  function displayExpenses(budgetId: string) {
    if (!expenses) {
      return;
    }
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        setBudgetsFunction,
        setExpensesFunction,
        addNewBudget,
        addNewExpense,
        displayExpenses,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
