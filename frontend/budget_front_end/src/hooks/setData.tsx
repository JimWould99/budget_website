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

const SetData = () => {
  let budgets: Budget[] = [];
  let expenses: Expense[] = [];
  if (localStorage.getItem("budgets")) {
    const holder = localStorage.getItem("budgets");
    if (holder) {
      budgets = JSON.parse(holder);
    }
  }
  if (localStorage.getItem("expenses")) {
    const holder = localStorage.getItem("expenses");
    if (holder) {
      expenses = JSON.parse(holder);
    }
  }
  const budgetsData: { name: string; spentAmount: number; amount: number }[] =
    [];
  budgets?.forEach((budget) => {
    interface Budget_object {
      name: string;
      amount: number;
      spentAmount: number;
    }
    const currentBudget: Budget_object = {
      name: "",
      amount: 0,
      spentAmount: 0,
    };
    currentBudget["name"] = budget.name;
    currentBudget["amount"] = budget.amount;
    expenses?.forEach((expense) => {
      if (budget.id === expense.budgetId) {
        currentBudget["spentAmount"] += expense.amount;
      }
    });
    budgetsData.push(currentBudget);
  });

  return budgetsData;
};

export default SetData;
