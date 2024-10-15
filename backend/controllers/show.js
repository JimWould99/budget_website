const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  res.json({ mssg: budgets });
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
