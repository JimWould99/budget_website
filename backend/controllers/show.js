const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { OpenAI } = require("openai");
require("dotenv").config();

exports.display_budget = async (req, res) => {
  const { id } = req.user;
  //const id = req.body.user;
  const budgets = await prisma.budget.findMany({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "asc" },
  });
  //console.log(budgets);
  res.json({ budgets });
};

exports.display_expense = async (req, res) => {
  const expenses = await prisma.expense.findMany({
    where: {
      budgetId: req.body.budgetId,
    },
    orderBy: { createdAt: "asc" },
  });
  //console.log(expenses);
  res.json({ mssg: expenses });
};

exports.display_expenses = async (req, res) => {
  const { id } = req.user;
  const expenses = await prisma.expense.findMany({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "asc" },
  });
  //console.log(expenses);
  res.json({ mssg: expenses });
};

exports.display_user = async (req, res) => {
  const { id } = req.user;
  // const email = req.body.email;
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      email: true,
      name: true,
      username: true,
    },
  });
  //console.log(user);
  res.json({ mssg: user });
};

exports.display_historic = async (req, res) => {
  const { id } = req.user;
  const historical = await prisma.dataSnapshot.findMany({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "asc" },
  });
  res.json(historical);
};

exports.display_advice = async (req, res) => {
  // console.log("req body", req.body);
  //const { data } = req.body;
  //console.log('data', data)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Your role is to act as a financial advisor for users managing their budgets and expenses. You will receive an object containing three arrays• 'historicData': An array of objects where each object represents a month in the past eight months, with keys: 'spent' (total amount spent that month) 'budgeted' (total budgeted amount that month) 'budgetData': An array of objects representing the user’s budgets for the current month. Each object includes:'name' (budget category) 'amount' (total allocated budget for that category)'expenseData': An array of objects representing expenses for the current month. Each object includes: 'id' (expense ID) 'budgetId' (ID of the budget it belongs to) 'amount' (expense amount) Upon receiving this data, provide three concise and actionable bullet points of financial advice: 1. Trend Analysis: Identify patterns in the user’s spending and budgeting history over the past eight months. Highlight any significant increases, decreases, or inconsistencies. 2. Budget & Expense Adjustments: Suggest specific changes the user could make to optimize their spending. This may include categories where they are overspending or areas where they can cut back. Comparison with National Averages: Compare their spending and budget allocations with typical spending patterns in the U.S. and UK. Provide context on how their expenses differ and suggest adjustments if they are significantly higher or lower in key categories (e.g., rent, groceries, entertainment). Adress advice to a second person eg. 'you can improve here'",
      },
      {
        role: "user",
        content: JSON.stringify(req.body),
      },
    ],
    store: true,
  });
  res.json(completion.choices[0].message);
};
