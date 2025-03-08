import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebar_context";
import { BudgetsContext } from "../context/budgets_context";
import { AuthContext } from "../context/auth_context";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { json } from "react-router-dom";
import SetData from "../hooks/setData";
import { set } from "date-fns";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
/*const lineData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];*/
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF8042",
  "#e3fd0c",
  "#0c10fd",
  "#f800f4",
];
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
function convertLineData(
  data: {
    amoundSpent: number;
    amountBudgeted: number;
    createdAt: string;
    id: string;
    userId: string;
  }[]
) {
  const newLineData: {
    name: string;
    "Amount spent": number;
    "Amount budgeted": number;
  }[] = [];
  data.forEach((entry) => {
    const month = { name: "", "Amount spent": 0, "Amount budgeted": 0 };
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(entry.createdAt).toLocaleDateString(
      undefined,
      options
    );
    month["name"] = date;
    month["Amount spent"] = entry.amoundSpent;
    month["Amount budgeted"] = entry.amountBudgeted;
    newLineData.push(month);
    console.log("new line data", newLineData);
  });
  return newLineData;
}
const Analysis_page = () => {
  const { user } = useContext(AuthContext);
  const [historicData, setHistoricData] = useState([]);
  useEffect(() => {
    if (!user) return;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    const fetchHistoricData = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/display_historic`,
        options
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
          return;
        });
      setHistoricData(data);
      console.log("historic data", data);
    };
    fetchHistoricData();
  }, [user]);
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
  const amountBudgeted: { name: string; value: number }[] = [];
  data.forEach(
    (budget: { amount: number; name: string; spentAmount: number }) => {
      const entry: { name: string; value: number } = {
        name: "",
        value: 0,
      };
      entry["name"] = budget["name"];
      entry["value"] = budget["amount"];
      amountBudgeted.push(entry);
    }
  );
  const lineData = convertLineData(historicData);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  console.log("current month", currentMonth);
  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && (
          <div className="h-full w-full">
            <div className="w-full mt-8 h-[100vh] md:h-[45vh] flex flex-col gap-8 lg:gap-0 lg:flex-row justify-apart">
              <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
                <p className="text-2xl">{`${currentMonth}: Amount spent`}</p>
                <ResponsiveContainer
                  isAnimationActive={false}
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={pieChart}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      // label={renderCustomizedLabel}
                      label={({ name }) => name} // Displaying the name
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={false} // Turn off animation
                    >
                      {pieChart.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
                <p className="text-2xl">{`${currentMonth}: Amount budgeted`}</p>
                <ResponsiveContainer
                  isAnimationActive={false}
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={amountBudgeted}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      // label={renderCustomizedLabel}
                      label={({ name }) => name} // Displaying the name
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={false} // Turn off animation
                    >
                      {pieChart.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:mt-20 mt-12 md:mt-80 mb-32 h-[60vh] w-full flex flex-col gap-4 justify-center items-center">
              <p className="text-2xl">Timeline: Amount spent and budgeted </p>
              <ResponsiveContainer
                isAnimationActive={false}
                width="100%"
                height="100%"
              >
                <LineChart
                  data={lineData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Amount spent"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Amount budgeted"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Analysis_page;
