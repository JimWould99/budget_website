const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.delete_budget = async (req, res) => {
  const chosenExpenses = await prisma.expense.delete({
    where: {
      budgetId: req.body.budgetId,
    },
  });
  const budget = await prisma.budget.delete({
    where: {
      id: req.body.budgetId,
    },
  });
  res.json({ mssg: budget, chosenExpenses });
};

exports.delete_expense = async (req, res) => {
  const expense = await prisma.expense.delete({
    where: {
      id: req.body.expenseId,
    },
  });
  res.json({ mssg: expense });
};

exports.delete_user = async (req, res) => {
  const { id } = req.user;
  const user = await prisma.users.delete({
    where: {
      id: id,
    },
  });
  res.json({ mssg: user });
};
