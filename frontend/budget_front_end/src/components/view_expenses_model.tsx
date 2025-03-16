import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import { useContext, useEffect, useCallback, useState } from "react";
import Expense_strip from "./expense_strip";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
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

function ExpenseChart({ total }: { total: number }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          activeShape={renderActiveShape}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x={230}
          y={105}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
        >
          {`$${total}`}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

const View_expenses_model = ({
  budget,
  specificExpenses,
}: {
  budget: Budget;
  specificExpenses: Expense[];
}) => {
  const budgetsContext = useContext(BudgetsContext);
  if (!budgetsContext) {
    throw new Error("BudgetsContext is undefined");
  }
  const { dispatch } = budgetsContext;
  let expenseTotal;

  useEffect(() => {
    let data;
    if (dispatch) {
      data = dispatch({
        type: "displayExpenses",
        payload: "b4898d90-b49b-4f1a-97fc-d021310ffe13",
      });
    }
  }, [dispatch]);

  if (specificExpenses) {
    expenseTotal = specificExpenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }

  console.log("expenseTotal", expenseTotal);

  return (
    <>
      <dialog id={budget.id} className="modal">
        <div className="modal-box">
          <div className="flex mb-3 items-center justify-between">
            <p className="text-2xl font-semibold">{budget.name} expenses</p>
          </div>
          <ExpenseChart total={expenseTotal} />
          <div className="mt-3">
            {specificExpenses &&
              specificExpenses
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((expense) => (
                  <Expense_strip
                    key={expense.id}
                    expense={expense}
                    budget={budget}
                  ></Expense_strip>
                ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default View_expenses_model;
