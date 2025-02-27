import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useContext, useEffect } from "react";
import { SidebarContext } from "../context/sidebar_context";
import { BudgetsContext } from "../context/budgets_context";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { json } from "react-router-dom";
import SetData from "../hooks/setData";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Analysis_page = () => {
  const { setSideBarShown, renderSidebar, showContent } =
    useContext(SidebarContext);

  const data: { name: string; spentAmount: number; amount: number }[] =
    SetData();
  const pieChart: { name: string; value: number }[] = [];

  data.forEach(
    (budget: { amount: number; name: string; spentAmount: number }) => {
      const entry: { name: string; value: number } = {
        name: "",
        value: 0,
      };
      entry["name"] = budget["name"];
      entry["value"] = budget["spentAmount"];
      pieChart.push(entry);
    }
  );
  console.log("piechart", pieChart);
  //const { budgets = [], expenses = [] } = useContext(BudgetsContext) || {};

  // const budgetData = SetData(budgets, expenses);

  //console.log("budget data!", JSON.stringify(budgetData));

  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && (
          <div className="h-96 w-96">
            <p>Total amount spent on each budget</p>
            <ResponsiveContainer
              isAnimationActive={false}
              width="100%"
              height="100%"
            >
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  // label={({ name }) => name} // Displaying the name
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false} // Turn off animation
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default Analysis_page;
