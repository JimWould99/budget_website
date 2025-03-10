import { createContext, useReducer, ReactNode, useEffect } from "react";

type BudgetsContextProviderProps = {
  children: ReactNode;
};

interface Expense {
  amount: number;
  budgetId: string;
  createdAt: string;
  id: string;
  name: string;
  recurring: boolean;
  userId: string;
}

interface Budget {
  amount: number;
  createdAt: string;
  id: string;
  name: string;
  userId: string;
}

interface BudgetState {
  budgets: Budget[] | null;
  expenses: Expense[] | null;
  relevantExpenses?: Expense[] | null;
}

type Action =
  | { type: "setBudgets"; payload: Budget[] }
  | { type: "setExpenses"; payload: Expense[] }
  | { type: "returnData"; payload: null }
  | { type: "addNewBudget"; payload: Budget }
  | { type: "addNewExpense"; payload: Expense }
  | { type: "displayExpenses"; payload: string }
  | { type: "updateExpense"; payload: Expense }
  | { type: "deleteBudget"; payload: string }
  | { type: "deleteExpense"; payload: string };

interface BudgetsContextType extends BudgetState {
  dispatch: React.Dispatch<Action>;
  testFunction: () => string;
}

export const BudgetsContext = createContext<BudgetsContextType | undefined>(
  undefined
);

export const budgetReducer = (
  state: BudgetState,
  action: Action
): BudgetState => {
  switch (action.type) {
    case "setBudgets":
      //console.log("setbudgets:", action.payload);
      return { ...state, budgets: action.payload };
    case "setExpenses":
      return { ...state, expenses: action.payload };
    case "returnData":
      //   console.log("state budgets", ...(state.budgets || []));
      return { ...state, budgets: [...(state.budgets || [])] };
    case "addNewBudget":
      //console.log("state.budgets", state.budgets);
      return {
        ...state,
        budgets: [action.payload, ...(state.budgets || [])],
      };
    case "addNewExpense":
      return {
        ...state,
        expenses: [...(state.expenses || []), action.payload],
      };
    case "displayExpenses":
      if (!state.expenses) {
        return state;
      } else {
        return {
          ...state,
          relevantExpenses: state.expenses.filter(
            (expense) => expense.budgetId === action.payload
          ),
        };
      }
    case "updateExpense": {
      const listOneRemoved = (state.expenses || []).filter(
        (expense) => expense.id !== action.payload.id
      );
      const updatedExpenses = [...listOneRemoved, action.payload];
      const sortedExpenses = updatedExpenses.sort((a, b) => {
        const first = new Date(a.createdAt).getTime();
        const second = new Date(b.createdAt).getTime();
        return first - second;
      });
      return {
        ...state,
        expenses: sortedExpenses,
      };
    }
    case "deleteBudget": {
      const newExpenses = (state.expenses || []).filter(
        (expense) => expense.budgetId !== action.payload
      );
      const newBudgets = (state.budgets || []).filter(
        (budget) => budget.id !== action.payload
      );
      return {
        ...state,
        expenses: newExpenses,
        budgets: newBudgets,
      };
    }
    case "deleteExpense": {
      const newExpenses = (state.expenses || []).filter(
        (expense) => expense.id !== action.payload
      );
      return {
        ...state,
        expenses: newExpenses,
      };
    }
    default:
      return state;
  }
};

export const BudgetsContextProvider = ({
  children,
}: BudgetsContextProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, {
    budgets: [],
    expenses: [],
  });

  useEffect(() => {
    if (localStorage.getItem("budgets")) {
      const budgets = localStorage.getItem("budgets");
      if (budgets !== undefined) {
        //  console.log("budgets", budgets);
        state.budgets = budgets ? JSON.parse(budgets) : [];
      }
    }
    if (localStorage.getItem("expenses")) {
      const expenses = localStorage.getItem("expenses");
      if (expenses !== undefined && expenses) {
        state.expenses = JSON.parse(expenses);
      }
    }
  }, []);

  useEffect(() => {
    //   console.log('console.log("state.budgets", state.budgets);', state.budgets);
    localStorage.setItem("budgets", JSON.stringify(state.budgets));
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.budgets, state.expenses]);

  const testFunction = () => {
    return "test";
  };

  return (
    <BudgetsContext.Provider value={{ ...state, testFunction, dispatch }}>
      {children}
    </BudgetsContext.Provider>
  );
};
