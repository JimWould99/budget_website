interface historicData {
  amountBudgeted: number;
  spentAmount: number;
  createdAt: string;
  id: string;
  userId: string;
}

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

interface refinedHistorical {
  createdAt: string;
  amountSpend: number;
  amountBudgeted: number;
}

export function SimplifyData({
  historicData,
}: {
  historicData: historicData[];
  budgets: Expense[];
  expenses: Budget[];
}) {
  const refinedHistorical: refinedHistorical[] = [];
  historicData.forEach((object) => {
    const holder: refinedHistorical = {
      createdAt: "",
      amountSpend: 0,
      amountBudgeted: 0,
    };
    holder.createdAt = object.createdAt;
    holder.amountBudgeted = object.amountBudgeted;
    holder.amountSpend = object.spentAmount;
    refinedHistorical.push(holder);
  });
}
